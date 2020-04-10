const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

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
app.use(cors(corsOptions))

app.get('/venues/search', (req, res, next) => {
  console.log('query', req.query)
  // const { sport, lon, lat, radius } = req.query
  res.json({
    venues
  })
})

app.get('/venues/:id', (req, res, next) => {
  console.log('params', req.params )
  res.json({
    id: req.params.id,
    sports: ['Basketball', 'Volleyball', 'Table Tennis']
  })
})

app.get('/sports/search', (req, res, next) => {
  const {lon, lat} = req.query
  res.json({
    venues: venues
  })
})


// start server listening on port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
