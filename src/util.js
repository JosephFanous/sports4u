export function getClientLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callback)
  }
}