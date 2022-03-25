const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const server = express()
const PORT = config.get('port') || 5000

server.use(express.json({ extended: true }))

server.use('/api/form/', require('./routes/card.router'))

if( process.env.NODE_ENV === 'production'){
    server.use('/', express.static(path.join(__dirname, 'client', 'build')))

    server.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function start() {
    try {
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        server.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

start()

