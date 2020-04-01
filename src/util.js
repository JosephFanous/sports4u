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