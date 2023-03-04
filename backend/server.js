const express = require('express')
const songsRoute = require('./routes/songs.route')
const {errorHandler} = require('./middleware/errorMiddleware')
const { urlencoded } = require('express')

const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000

const app = express()

app.use(express.json())
app.use(urlencoded({extended: false}))

app.use('/api/songs',songsRoute)

app.use(errorHandler)

app.listen(port,() => console.log(`Server started on port ${port}`))

