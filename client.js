const io = require('socket.io-client')
const fs = require('fs')
const _ = require('lodash')
const { exec } = require('child_process')
var NodeRSA = require('node-rsa')
var crypto = require('crypto')
var path = require('path')
var http = require('http')
var algo = 'aes256'
var clients = new Array(20)

const socket = io.connect('http://localhost:8000')

socket.on('ACK', function(data) {
    console.log("The message is acknowledged: " + data.message)
})
socket.on('NOACK', function(data) {
    console.log('The message is not acknowledged: ' + data.message)
})

fs.readFile('./msg.txt', function(err, content) {
    if (err) {
        console.log(err);
    }
    _.forEach(clients, () => {
        // data = {}
        var textArr = content.toString().split(' ')
        var text = textArr[Math.round(Math.random())]
        console.log(text)
        var cipher = crypto.createCipher(algo, "123456")
        text = cipher.update(text, 'utf8', 'hex') + cipher.final('hex')
        // text = key.encrypt(text, 'base64')

        socket.emit('event', text.toString())
        // socket.on('REC', function(info) {
        //     console.log(info)
        //     return
        // })
    })
})