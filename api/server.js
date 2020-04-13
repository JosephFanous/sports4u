const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose();

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
  }
}
app.use(cors(corsOptions));

app.get('/venues/search', (req, res, next) => {
  console.log('query', req.query)
  // const { sport, lon, lat, radius } = req.query
  // TODO: replace this with a radius search
  db.all('SELECT LocationID as id, Latitude, Longitude FROM Location', (err, rows) => {
    res.json({
      venues: rows
    })
  })
})

<<<<<<< HEAD

=======
>>>>>>> 7f080b2d8976db3b1e754593d25ce50129579e23
app.get('/venues/:id/sports', (req, res, next) => {
  const { id } = req.params
  console.log('params', req.params )
  db.all(
    `
      SELECT SportType.Name FROM Location
      INNER JOIN Event ON Location.LocationID = Event.LocationID
      INNER JOIN SportType on Event.SportID = SportType.SportID
      WHERE Location.LocationID = ?
      GROUP BY SportType.Name
    `,
    id,
    (err, rows) => {
      if (err) console.error(err)
      console.log(rows)
      res.json({
        id: req.params.id,
        sports: rows.map(sport => sport.Name)
      })
    })
})

app.post('/login', (req, res, next) => {
 console.log(req.body)
 res.json(req.body)
})

app.get('/sports/search', (req, res, next) => {
  const {lon, lat} = req.query
  res.json({
    venues: venues
  })
})

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
    db.all(`SELECT Name, StartTime, EndTime, EventAddedTime, EventDone, PeopleAttending,SportName, Latitude, Longitude
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

// Get SignedUp evemts by a specfic user
app.get('/SignedUpEvents/:id/Attending', (req, res, next) => {
  db.serialize(() => {
    db.all(`Select User.UserName,User.Email,Event.Name,Event.StartTime,Event.EndTime, Event.EventAddedTime, Event.EventDone,
            Event.PeopleAttending,SportType.SportName, Location.Latitude, Location.Longitude
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



// start server listening on port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
