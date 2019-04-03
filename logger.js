var fs = require('fs')
var Logger = (exports.Logger = {})
var infoStream = fs.createWriteStream('info.txt')
var errorStream = fs.createWriteStream('error.txt')
var debugStream = fs.createWriteStream('debug.txt')
Logger.info = function(msg) {
    var message = new Date().toISOString() + " : " + msg + "\n"
    infoStream.write(message)
}
Logger.error = function(msg) {
    var message = new Date().toISOString() + " : " + msg + "\n"
    errorStream.write(message)
}
Logger.debug = function(msg) {
    var message = new Date().toISOString() + " : " + msg + "\n"
    debugStream.write(message)
}