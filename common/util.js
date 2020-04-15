exports.toRadians = function(deg) {
  return deg * (Math.PI / 180)
}

// https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
exports.isValidDate = function(dateStr) {
  const timestamp = Date.parse(dateStr)

  // if the timestamp is a number, it is a valid date
  return !isNaN(timestamp)
}
