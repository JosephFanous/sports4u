const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose()
const session = require('express-session')
const { toRadians } = require('./util')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

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
      SELECT * FROM Location
      LEFT JOIN Event ON Location.LocationID = Event.LocationID
      LEFT JOIN SportType on Event.SportID = SportType.SportID
      WHERE Location.LocationID = ?
      ORDER BY Event.EventAddedTime DESC
    `,
    id,
    (err, rows) => {
      if (err) console.error(err)
      console.log('/venues/:id', rows)
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
            EventAddedTime: row.EventAddedTime
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
  } else if(req.body.password!=row.pass){
    res.json({
      errors:{
        password: 'hasError'
      }
    })
  }else{
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
  }
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

//Pulls isSigned in From  DB
//TODO
app.get('/', (req, res, next) => {

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
    db.all(`SELECT Name, StartTime, EndTime, EventAddedTime, EventDone, PeopleAttending,SportName, Latitude, Longitude, Address
            FROM EVENT
            INNER JOIN SportType ON Event.SportID= SportType.SportID
            INNER JOIN Location ON Event.LocationID = Location.LocationID
            WHERE EventDone = ? AND UserID != ?`,req.params.EventStatus,req.params.id ,(err, row) => {
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
    db.all(`Select User.UserName,User.Email,Event.Name,Event.StartTime,Event.EndTime, Event.EventAddedTime, Event.EventDone,
            Event.PeopleAttending,SportType.SportName, Location.Latitude, Location.Longitude, Location.Address
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
  db.serialize(() => {
    db.all(`DELETE FROM Event WHERE EventID = ?`, req.body.EventID ,(err, row) => {
      if (err) {
        console.error(err.message);
      }
    })
  });
  console.log("Event ID Removed : ",req.body.EventID)

});


// start server listening on port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
