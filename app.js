const express = require('express'),
    path = require('path'),
    http = require('http'),
    bodyParser = require('body-parser'),
    router = require('./routes')
    config = require('./config/app.config'),
    mongoose = require('./db/mongoose'),
    passport = require('passport')

const app = express()

mongoose.connectDB()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())

app.use('/api', router)

app.use((req, res, next) => {
    let err = new Error('Not found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err)
})

const server = http.createServer(app)

server.listen(config.port)
server.on('listening', () => {
    let addr = server.address();
    bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    console.log(`Listening on ${bind}`)
})