const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose()
const session = require('express-session')
const { toRadians, isValidDate } = require('../common/util')
const bcrypt = require('bcrypt')


const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


var server = require('http').Server(app);
var io = require('socket.io')(server);
var data = {}


//Listen for socket conection from the client and dissconnection
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', ([msg, user_name]) => {
    console.log(user_name + ' : ' + msg);
    io.emit('chat message', [msg, user_name]);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


// TODO: database integration (this is just mock data for testing)
const venues = [
  {
    id: 1,
    coordinates: [-78.8940808, 43.9257554]
  },
  {
    id: 2,
    coordinates: [-78.8695454, 43.904493]
  },
  {
    id: 3,
    coordinates: [-78.896513, 43.944809]
  }
]

// open the database
const db = new sqlite3.Database('./database/sportDatabase.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the Sports database.');
});

// whitelist requests from frontend server
const whitelist = ['http://localhost:8080', 'http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      const error = new Error('Not allowed by CORS')
      error.status = 400
      callback(error)
    }
  },
  credentials: true
}
app.use(cors(corsOptions));

app.use(session({
  secret: 'change this probably',
  cookie: {
    // 365 days in milliseconds
    maxAge: 365 * 24 * 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: true
}))

// check if the user is currently logged in to update frontend
app.get('/auth', (req, res, next) => {
  if (!req.session.userID) return res.json({ user: null })

  db.get(`
    SELECT UserID as id, UserName as username
    FROM User
    WHERE id = ?
  `,
  [req.session.userID],
  (err, row) => {
    if (err) console.error(err)

    if (err || !row) {
      return res.json({ user: null })
    } else {
      return res.json({
        user: {
          id: row.id,
          username: row.username,
        }
      })
    }
  })
})

app.get('/venues/search', (req, res, next) => {
  console.log('query', req.query)
  const { sport, radius } = req.query
  const lon = parseFloat(req.query.lon)
  const lat = parseFloat(req.query.lat)

  // try to calculate a square
  // because trying to calculate points within radius is too hard with sqlite
  // https://stackoverflow.com/questions/639695/how-to-convert-latitude-or-longitude-to-meters
  const latDelta = radius / 111.32
  const lonDelta = radius / (40075 * Math.cos(toRadians(lat)) / 360)

  db.all(
    `
      SELECT Location.LocationID as id, Latitude, Longitude
      FROM Location
      INNER JOIN Event ON Location.LocationID = Event.LocationID
      INNER JOIN SportType on Event.SportID = SportType.SportID
      WHERE SportType.SportName = ? AND
      Location.Latitude < ? AND
      Location.Latitude > ? AND
      Location.Longitude < ? AND
      Location.Longitude > ?
      GROUP BY Location.LocationID
    `,
    sport,
    lat + latDelta,
    lat - latDelta,
    lon + lonDelta,
    lon - lonDelta,
    (err, rows) => {
      if (err) console.log(err)
      console.log(rows)
      res.json({
        venues: rows
      })
  })
})

// get venue data given some id
app.get('/venues/:id', (req, res, next) => {
  const { id } = req.params
  db.all(
    `
      SELECT
        Location.Longitude,
        Location.Latitude,
        Event.EventID,
        Event.Name,
        SportType.SportName,
        Event.StartTime,
        Event.EndTime,
        Event.EventAddedTime,
        IsAttending
      FROM Location
      LEFT JOIN Event ON Location.LocationID = Event.LocationID
      LEFT JOIN SportType on Event.SportID = SportType.SportID
      LEFT JOIN UserAttendingEvent on Event.EventID = UserAttendingEvent.EventID
      LEFT JOIN (
        SELECT 1 as IsAttending FROM UserAttendingEvent WHERE UserAttendingEvent.UserID = ?
      ) ON Event.EventID = UserAttendingEvent.EventID
      WHERE Location.LocationID = ?
      GROUP BY Event.EventID
      ORDER BY Event.EventAddedTime DESC
    `,
    [req.session.userID, id],
    (err, rows) => {
      if (err) console.error(err)
      // console.log('/venues/:id', rows)
      if (!rows) {
        return res.json({
          error: 'Venue not found'
        })
      }

      let events = []
      // if there actually are events at this location, we add create an array of them
      if (rows[0].EventID) {
        events = rows.map(row => {
          return {
            EventID: row.EventID,
            Name: row.Name,
            SportName: row.SportName,
            StartTime: row.StartTime,
            EndTime: row.EndTime,
            EventAddedTime: row.EventAddedTime,
            IsAttending: row.IsAttending
          }
        })
      }

      res.json({
        id: req.params.id,
        coords: {
          Longitude: rows[0].Longitude,
          Latitude: rows[0].Latitude
        },
        events: events
      })
    })
})

app.get('/venues/:id/sports', (req, res, next) => {
  const { id } = req.params
  console.log('params', req.params )
  db.all(
    `
      SELECT SportType.SportName FROM Location
      INNER JOIN Event ON Location.LocationID = Event.LocationID
      INNER JOIN SportType on Event.SportID = SportType.SportID
      WHERE Location.LocationID = ?
      GROUP BY SportType.SportName
    `,
    id,
    (err, rows) => {
      if (err) console.error(err)
      console.log(rows)
      res.json({
        id: req.params.id,
        sports: rows.map(sport => sport.SportName)
      })
    })
})

// return venue id if it exists, else, create it and return it
app.post('/venues/find', (req, res, next) => {
  const { lon, lat, address } = req.body
  console.log('/venues/find:', lon, lat, address)
  db.get(
    `
      SELECT Location.LocationID FROM Location
      WHERE Location.Longitude = ?
      AND Location.Latitude = ?
      AND Location.Address = ?
    `,
    [lon, lat, address],
    (err, row) => {
      console.log('/venues/find:', row)
      if (row) {
        return res.json({
          venueID: row.LocationID
        })
      }

      // if no row is found, we create the venue page
      db.run(`
        INSERT INTO Location (Longitude, Latitude, Address)
        VALUES (?, ?, ?)
      `,
      [lon, lat, address],
      function (err) {
        if (err){
          console.error(err)
          return res.json({ venueID: null })
        }
        // if we successfully added the location, we send the newly added ID
        return res.json({
          venueID: this.lastID
        })
      })
    }
  )
})

app.get('/venues/:id/daydata', (req, res, next) => {
  db.all(`
      SELECT strftime("%w", StartTime) as StartDay,
      CAST((julianday(EndTime) - julianday(StartTime)) + 1 as INT) as DayLength
      FROM Event
      WHERE LocationID = ?
    `,
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.error(err)
        return res.json({ error: 'Could not fetch day data.' })
      }

      // total number of days that have events going on on them
      // if an event takes up 2 days, sumDays is incremented by 2
      let sumDays = 0
      const popularityByDay = { Su: 0, M: 0, T: 0, W: 0, Th: 0, F: 0, S: 0 }

      if (!rows.length) {
        return res.json({ popularityByDay })
      }

      const occurrences = [0, 0, 0, 0, 0, 0, 0]
      rows.forEach(row => {
        sumDays += row.DayLength
        const startDay = parseInt(row.StartDay)
        for (let offset = 0; offset < row.DayLength && offset < 7; offset++) {
          occurrences[(startDay + offset) % 7]++
        }
      })

      const days = ['Su', 'M', 'T', 'W', 'Th', 'F', 'S']
      occurrences.forEach((total, i) => {
        const day = days[i]
        popularityByDay[day] = total / sumDays
      })

      return res.json({ popularityByDay })
    }
  )
})

app.post('/first', (req, res, next) => {
  if(req.body.First){
    db.run('UPDATE User SET First = ? WHERE UserID = ?',[req.body.First,req.session.userID], function (err) {
      if (err){
            throw err
      } else{
        return res.json({
          first: 'hi',
          success: true
        })
      }
    })
  }
})

app.get('/first', (req, res, next) => {
  db.get('SELECT * FROM User WHERE UserID = ?', [req.session.userID], (err, row) => {
    if (err){
      return err
    }
    return res.json({
      first: row.First,
    })
  })
})

app.post('/last', (req, res, next) => {
  if(req.body.Last){
    db.run('UPDATE User SET Last = ? WHERE UserID = ?',[req.body.Last,req.session.userID], function (err) {
      if (err){
            throw err
      } else{
        return res.json({
          last: 'hi',
          success: true
        })
      }
    })
  }
})

app.get('/last', (req, res, next) => {
  db.get('SELECT * FROM User WHERE UserID = ?', [req.session.userID], (err, row) => {
    if (err){
      return err
    }
    return res.json({
      last: row.Last,
    })
  })
})

app.post('/username', (req, res, next) => {
  if(req.body.Username){
    db.get('SELECT UserName as user FROM User WHERE user = ?', [req.body.Username],(err, row) => {
      if(row){
        res.json({
          errors:{
            User: 'hasError'
          }
        })
      } else{
        db.run('UPDATE User SET UserName = ? WHERE UserID = ?',[req.body.Username,req.session.userID], function (err) {
          if (err){
                throw err
          }
          else{
            return res.json({
              Username: req.body.Username,
              success: true
            })
          }
        })
    }
    })
  }
})

app.get('/username', (req, res, next) => {
  db.get('SELECT * FROM User WHERE UserID = ?', [req.session.userID], (err, row) => {
    if (err){
      return err
    } else {
      return res.json({
      user: row.UserName,
    })
    }
  })
})

app.post('/email', (req, res, next) => {
  if(req.body.Email){
    db.get('SELECT Email as email FROM User WHERE email = ?', [req.body.Email],(err, row) => {
      console.log(row)
      console.log(req.body.Email)
      if(row){
        res.json({
          errors:{
            Email: 'hasError'
          }
        })
      } else{
        db.run('UPDATE User SET Email = ? WHERE UserID = ?',[req.body.Email,req.session.userID], function (err) {
          if (err){
                throw err
          }
          else{
            return res.json({
              email: 'hi',
              success: true
            })
          }
        })
    }
    })
  }
})

app.get('/email', (req, res, next) => {
  db.get('SELECT * FROM User WHERE UserID = ?', [req.session.userID], (err, row) => {
    if (err){
      return err
    } else {
      return res.json({
      email: row.Email,
    })
    }
  })
})

app.post('/password', (req, res, next) => {
  if(req.body.Password){
    bcrypt.hash(req.body.Password, 10, function(err, hash) {
         if(err){
           throw err
         }else{
        db.run('UPDATE User SET Password = ? WHERE UserID = ?',[hash, req.session.userID], function (err) {
          if (err){
                throw err
          } else{
            return res.json({
              success: true
            })
          }
        })
      }
    })
  }
})

app.post('/register', (req, res, next) => {
  db.get('SELECT UserName as user, Email as email FROM User WHERE user = ? OR email = ?', [req.body.Username, req.body.Email],(err, row) => {
    const errors = {}
    if(err){
      throw err
    }
    if(row){
      if(req.body.Username==row.user){
        errors.Username = 'hasError'
      }
      if(req.body.Email==row.email){
        errors.Email = 'hasError'
      }
      if(errors.Username || errors.Email){
        res.json({
          errors
        })
      }
    }

    else{
      bcrypt.hash(req.body.Password, 10, function(err, hash) {
        if(err){
          throw err
        } else{
          db.run('INSERT INTO User(First, Last, UserName, Email, Password) VALUES(?,?,?,?,?)',[req.body.First,req.body.Last,req.body.Username,req.body.Email,hash], function (err) {
            if (err){
              throw err
            }
            else{
              console.log(row)

              req.session.userID = this.lastID
              res.json({
                user: {
                  username: req.body.Username,
                  id: this.lastID
                },
                success: true
              })
            }
          })
        }
      });
    }
  })
})

app.post('/login', (req, res, next) => {
 console.log(req.body)
 db.get('SELECT UserID as id, Email as email, Password as pass, UserName as username FROM User WHERE email = ?',req.body.email,(err, row) => {
  if (err) {
    throw err;
  }
  if(!row){
    res.json({
      errors:{
        email: 'hasError'
      }
    })
    return
  }
  bcrypt.compare(req.body.password, row.pass, function(err, rez) {
    if(rez) {
      // set the session cookie username field to the row's username
      // and send it back so we can store it in vue globals for UI
      req.session.userID = row.id
      console.log('/login:', row)
      console.log('/login:', req.session.userID)
      res.json({
        success: true,
        user: {
          id: row.id,
          username: row.username,
        }
      })
    } else {
      res.json({
        errors:{
          password: 'hasError'
        }
      })    }
  });
  console.log(row);
  });

})

app.post('/logout', (req, res, next) => {
  console.log('/logout:', req.session)

  if (!req.session.userID) {
    return res.status(400).json({
      error: 'Not logged in'
    })
  }

  req.session.userID = null
  res.json({
    success: true
  })
})

app.post('/', (req, res, next) => {
 console.log(req.body)
 db.all('SELECT Name as name, StartTime as start,EndTime as endtime FROM Event',(err, rows) => {
  if (err) {
    throw err;
  }
  if(!rows){
    res.json({
      errors:{
        eventnames: 'Events not found'
      }
    })
   }else{
    res.json({
      events: rows,
    })
  }
  console.log(rows);
  });

})

app.get('/sports/search', (req, res, next) => {
  const {lon, lat} = req.query
  res.json({
    venues: venues
  })
})



//Gets all event names, event start times, and event endtimes

// Used to get user data
app.get('/users/:id', (req, res, next) => {
  db.serialize(() => {
    db.get(`SELECT * FROM User WHERE UserID =` + req.params.id + `;` ,(err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row);
       // Sending data with the request
       res.send(JSON.stringify(row));
    })
  });
});

// POST to add an event
app.post('/Events', async (req, res, next) => {
  const { locationID, eventName, sport, startDate, endDate } = req.body

  if (!req.session.userID) {
    return res.json({
      errors: {
        general: 'Please log in to add events.'
      }
    })
  }

  const errors = {}
  if (!locationID || isNaN(parseInt(locationID))) errors.general = 'Invalid location.'
  if (!eventName) errors.eventName = 'Please enter an event name.'
  if (!sport) errors.sport = 'Please enter a sport.'
  if (!isValidDate(startDate)) errors.startDate = 'Please enter a valid start date.'
  if (!isValidDate(endDate)) errors.endDate = 'Please enter a valid end date.'

  if (Object.keys(errors).length) {
    return res.json({ errors })
  }

  db.run(`
      INSERT INTO Event (UserID, LocationID, Name, SportID, StartTime, EndTime, EventAddedTime)
      VALUES (?, ?, ?, (SELECT SportID from SportType WHERE SportName = ?), datetime(?), datetime(?), datetime("now"))
    `,
    [req.session.userID, locationID, eventName, sport, startDate, endDate],
    function(err) {
      if (err) {
        console.error(err)
        res.json({
          errors: { general: 'Could not create event.' }
        })
      } else {
        res.json({
          addedEventID: this.lastID
        })
      }
    }
  )
})

// Get finished and unfinshed events
app.get('/Events/:id/:EventStatus', (req, res, next) => {
  db.serialize(() => {
    db.all(`SELECT *
            FROM EVENT
            INNER JOIN SportType ON Event.SportID= SportType.SportID
            INNER JOIN Location ON Event.LocationID = Location.LocationID
            WHERE EventDone = ? AND UserID = ?`,req.params.EventStatus,req.params.id ,(err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row);
       // Sending data with the request
      res.send(JSON.stringify(row));
    })
  });
});

// Get all upcming events near user
app.get('/UpcomingEvents/:id/:EventStatus', (req, res, next) => {
  db.serialize(() => {
    db.all(`SELECT Event.EventID, Event.UserID, Event.LocationID, Event.Name, Event.SportID, Event.StartTime, Event.EndTime, Event.EventAddedTime, Event.EventDone, Event.PeopleAttending,
            User.First, User.Last, User.UserName, User.Email, User.Rating, Location.Address, Location.Latitude, Location.Longitude, SportType.SportName
            FROM Event
            LEFT JOIN UserAttendingEvent ON Event.EventID = UserAttendingEvent.EventID
            INNER JOIN User ON Event.UserID = User.UserID
            INNER JOIN Location ON Event.LocationID = Location.LocationID
            INNER JOIN SportType ON Event.SportID = SportType.SportID
            WHERE (Event.UserID != `+req.params.id+` AND (UserAttendingEvent.UserID IS NULL OR UserAttendingEvent.UserID != `+req.params.id+`) AND EventDone = `+req.params.EventStatus+`);` ,(err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row);
       // Sending data with the request
      res.send(JSON.stringify(row));
    })
  });
});

// Get SignedUp evemts by a specfic user
app.get('/SignedUpEvents/:id/Attending', (req, res, next) => {
  db.serialize(() => {
    db.all(`Select *
            From UserAttendingEvent
            INNER JOIN Event ON Event.EventID= UserAttendingEvent.EventID
            INNER JOIN Location ON Event.LocationID= Location.LocationID
            INNER JOIN SportType ON SportType.SportID= Event.SportID
            INNER JOIN User ON Event.UserID= User.UserID
            Where UserAttendingEvent.UserID = ? AND  Event.EventDone = 0;`,req.params.id ,(err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row);
       // Sending data with the request
      res.send(JSON.stringify(row));
    })
  });
});

// Post request to deleteEvents for a specfic user
app.post('/DeleteEvents', (req, res) => {
  if (!req.session.userID) return res.json({
    error: 'Not logged in'
  })

  db.serialize(() => {
    if(req.body.TypeOfEvent == 'UserEvents'){
      db.run(`DELETE FROM Event WHERE EventID = ?`, req.body.EventID)
        .run(`DELETE FROM Notification WHERE EventID = ?`, req.body.EventID)
        .run(`INSERT INTO Notification (UserID, EventID, DeleteEvent)
                SELECT UserID,`+req.body.EventID+`,'`+req.body.EventName+`' FROM UserAttendingEvent
                WHERE UserAttendingEvent.EventID  = `+req.body.EventID+`;`, (err, row) => {
            if (err) {
              console.error(err.message);
            } else {
              res.json({ success: true })
            }
          });
    }
    if (req.body.TypeOfEvent == 'SignedUpEvents') {
      db.run(
        `DELETE FROM UserAttendingEvent WHERE EventID = ? AND UserID = ?`,
        [req.body.EventID, req.session.userID])
        .run(`UPDATE Event
                 SET PeopleAttending = PeopleAttending - 1
                 WHERE EventID = ?;`, req.body.EventID)
        .run(`DELETE FROM Notification WHERE EventID = ?`, req.body.EventID, (err, row) => {
          if (err) {
            console.error(err.message);
          } else {
            res.json({ success: true })
          }
        });

    }
  });
  console.log("Event ID Removed : ", req.body.EventID)
  console.log("DelelteFor : ", req.body.TypeOfEvent)

});

// Post request used to Join event
app.post('/JoinEvent', (req, res) => {
  if (!req.session.userID) {
    return res.json({
      error: 'Not logged in'
    })
  }

  db.serialize(() => {
    db.run(`INSERT INTO UserAttendingEvent (UserID, EventID)
            VALUES (?,?);`, req.session.userID, req.body.EventID, (err, row) => {
    }).run(`UPDATE Event
              SET PeopleAttending = PeopleAttending + 1
              WHERE EventID = ?;`,req.body.EventID ,(err, row) => {
    }).run(`INSERT INTO Notification (UserID, JoinedUser, EventId)
                VALUES (?,?,?);`,req.body.OwnerUserID,req.body.UserName,req.body.EventID ,(err, row) => {
              if (err) {
                console.error(err.message);
                res.json({
                  error: 'Could not join event.'
                })
              } else {
                res.json({
                  success: true
                })
              }
       });
  });
  console.log("Joining Event ID  : ",req.body.EventID)
  console.log("User : ",req.body.UserID)
  console.log("UserJoined : ",req.body.UserName)
  console.log("OwnserID", req.body.OwnerUserID)
});


// Post request used to update the users request event and add to notification bar
app.post('/UpdateEdit', (req, res) => {
    db.run(`UPDATE Event
            SET Name = '`+ req.body[2] +`', StartTime = '` + req.body[4] + `', EndTime = '` + req.body[5] + `', SportID = '`+req.body[3]+`'
            WHERE UserID = ` + req.body[0] +` AND EventID = ` + req.body[1] + `;`,(err, row) => {
            if (err) {
              console.error(err.message);
            }
     });
    console.log("Update Request : ",req.body)
    // Used to avoid any duplicate of notifications
    db.all(`DELETE FROM Notification WHERE EventID = ?`,+req.body[1],(err, row) => {
            if (err) {
              console.error(err.message);
            }
        });

    //Insert Notification ino to  the database
    db.all(`INSERT INTO Notification (UserID, EventID, UpdateEvent)
            SELECT UserID,`+req.body[1]+`,'`+req.body[2]+`' FROM UserAttendingEvent
            WHERE UserAttendingEvent.EventID  = `+req.body[1]+`;`,(err, row) => {
            if (err) {
              console.error(err.message);
            }
        });

});


// Used to get the notification of a specfic user
app.get('/NewUsersJoined/:id', (req, res, next) => {
  db.serialize(() => {
    db.all(`SELECT JoinedUser, Event.Name
            FROM Notification
            INNER JOIN  Event ON Event.EventID = Notification.EventID
            WHERE Notification.UserID = ?;`,req.params.id ,(err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row);
       // Sending data with the request
      res.send(JSON.stringify(row));
    })
  });
});

// Used to get all the users attending event
app.get('/AllUserAttendingEvents', (req, res, next) => {
  db.serialize(() => {
    db.all(`SELECT * FROM UserAttendingEvent;` ,(err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row);
       // Sending data with the request
      res.send(JSON.stringify(row));
    })
  });
});

// Used to get all the users attending event
app.get('/SignUpUpdates/:id', (req, res, next) => {
  db.serialize(() => {
    db.all(`SELECT UpdateEvent
            FROM Notification
            Where UserID = ? AND UpdateEvent IS NOT NULL`,req.params.id,(err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row);
       // Sending data with the request
      res.send(JSON.stringify(row));
    })
  });
});
// Used to get all the users attending event
app.get('/EventDeleted/:id', (req, res, next) => {
  db.serialize(() => {
    db.all(`SELECT DeleteEvent
            FROM Notification
            Where UserID = ? AND DeleteEvent IS NOT NULL`,req.params.id,(err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row);
       // Sending data with the request
      res.send(JSON.stringify(row));
    })
  });
});

// Used to remove the notification once they have logged out
app.post('/LogoutRequest', (req, res, next) => {
  console.log(req.body)
  db.serialize(() => {
    db.all(`DELETE FROM Notification WHERE UserID = ?;`,req.params.id,(err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row);
    })
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000')
})
// start server listening on port 3000
