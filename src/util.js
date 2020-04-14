export function getClientLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callback)
  }
}

export function toRadians(deg) {
  return deg * (Math.PI / 180)
}

// https://wiki.openstreetmap.org/wiki/Zoom_levels
export function metresToPixels(metres, latitude, zoomLevel) {
  const earthCircumference = 40075016.686
  const metresPerPixel = earthCircumference * Math.cos(toRadians(latitude)) / Math.pow(2, zoomLevel + 9)
  return metres / metresPerPixel
}

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