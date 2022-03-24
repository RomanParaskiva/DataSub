const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const server = express()
const PORT = config.get('port') || 5000

server.post('/card', async (req, res) => {
    try {
        res.status(200).json({message: 'Ok'})
    } catch (e) {
        res.status(500).json({message: e.message})
    }
    
})

async function start() {
    try {
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        server.listen(PORT, () => {
            console.log('Server has been started')
        })
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

start()

