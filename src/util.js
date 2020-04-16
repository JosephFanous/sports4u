import { toRadians } from '../common/util'

export function getClientLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callback)
  }
}

// https://wiki.openstreetmap.org/wiki/Zoom_levels
export function metresToPixels(metres, latitude, zoomLevel) {
  const earthCircumference = 40075016.686
  const metresPerPixel = earthCircumference * Math.cos(toRadians(latitude)) / Math.pow(2, zoomLevel + 9)
  return metres / metresPerPixel
}

// get locations from some search query
export function geocode(query) {
  const endpoint = `geocoding/v5/mapbox.places/${query}.json`;
  return fetch(`https://api.mapbox.com/${endpoint}?access_token=${process.env.VUE_APP_MAPBOX_API_KEY}`)
    .then(res => {
      if (res.ok) return res.json()
      else throw new Error(res.status)
    })
    .then(data => {
      return data.features
    })
}

// get location data from coordinates
export function reverseGeocode(lon, lat) {
  const endpoint = `geocoding/v5/mapbox.places/${lon},${lat}.json`

  return fetch(`https://api.mapbox.com/${endpoint}?access_token=${process.env.VUE_APP_MAPBOX_API_KEY}`)
    .then(res => {
      if (res.ok) return res.json()
      else throw new Error(res.status)
    })
    .then(json => {
      const location = json.features[0]
      return location
    })
}

// get the venue id from db given some coordinates and address
export function findVenuePage(lon, lat, address) {
  const apiUrl = process.env.VUE_APP_API_URL
  return fetch(`${apiUrl}/venues/find`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ lon, lat, address })
    }
  ).then(res => {
    if (res.ok) return res.json()
    else throw new Error(res.status)
  }).then(data => data.venueID)
}

// get venue data from some venue id
export function getVenue(id) {
  const apiUrl = process.env.VUE_APP_API_URL
  return fetch(`${apiUrl}/venues/${id}`)
    .then(res => {
      if (res.ok) return res.json()
      else throw new Error(res.status)
    })
    .then(data => data)
}

// send a request to end the current session (deletes session on server and cookie on client)
export function endSession() {
  const apiUrl = process.env.VUE_APP_API_URL
  return fetch(`${apiUrl}/logout`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }
  ).then(res => {
    if (res.ok) return res.json()
    else throw new Error(res.status)
  })
}

// send a request to add an event
export function addEvent(body) {
  const apiUrl = process.env.VUE_APP_API_URL
  return fetch(`${apiUrl}/Events`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // USE credentials: 'include' TO MAKE SURE AUTHENTICATION COOKIE IS SENT TO SERVER
      credentials: 'include',
      body: JSON.stringify(body)
    }
  ).then(res => {
    if (res.ok) return res.json()
    else throw new Error(res.status)
  })
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

export function formatDate(str) {
  const date = new Date(str)
  const dayStr = days[date.getDay()]
  const monthStr = months[date.getMonth()]
  return `${dayStr}, ${monthStr} ${date.getDate()}, ${date.getFullYear()}`
}

export function formatTime(str) {
  const date = new Date(str)
  let isPM = false
  let hours = date.getHours()
  if (hours >= 12) {
    hours -= 12
    if (hours == 0) hours = 12
    isPM = true
  } else if (hours == 0) {
    hours = 12
  }

  let minutes = date.getMinutes()
  if (minutes < 10) minutes = '0' + minutes

  return `${hours}:${minutes} ${isPM ? 'PM' : 'AM'}`
}

// https://stackoverflow.com/questions/17182544/disable-certain-dates-from-html5-datepicker
export function todayInputValue() {
  return (new Date().toISOString().split('T')[0])
}

export function FormatDateDatabase(DateTime){
  var d = new Date(DateTime);
  var month = d.getMonth() + 1;
  var hour = d.getHours();
  var date = d.getDate();
  var min = d.getMinutes()
  if(month <= 9){
    month = ("0" + month).slice(-2);
  }
  if(hour <= 9){
    hour = ("0" + hour).slice(-2);
  }
  if(date <= 9){
    date = ("0" + date).slice(-2);
  }
  if(min <= 9){
    min = ("0" + min).slice(-2);
  }
  return (d.getFullYear() + "-" + month + "-" + date  + " " + hour + ":" + min + ":00")
}
