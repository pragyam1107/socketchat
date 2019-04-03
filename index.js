var express = require('express')
var bodyParser = require('body-parser')
var app = express()
// var router = new express.Router()
const NodeRSA = require('node-rsa')
var cors = require('cors')
const exec = require('child_process').exec
var numClients = 0
var fs = require('fs')
var logger = require('./logger').Logger
app.use(bodyParser.json({limit: '5mb'}))
app.use(cors())
const crypto = require('crypto')
var key = '123456'
var algo = 'aes256'
const server = require('http').createServer(app)
const io = require('socket.io')(server)
users = []
io.on('connection', function(socket) {

    socket.on('event', function(data) {
        decipher = crypto.createDecipher(algo, key)
        message = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8')
        try {
            logger.info('message: ' + message)
            socket.emit('ACK', {message: message})
            exec(message, (err, stdout, stderr) => {
            if (stdout) {
                console.log(stdout)
            } else {
                console.log(message)
            }
            })
        } catch (err) {
            logger.error('NOACK message: ' + err)
            socket.emit('NOACK', {message: message})
            return;
        }
    })
})


server.listen(8000, 'localhost', function() {
    console.log('socketChat back end running........')
});

process.on('SIGTERM', onServerEnd);

function onServerEnd() {
    process.exit(0);
}