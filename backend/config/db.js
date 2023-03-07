const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://kirubels:kirubels@webapp.xx245vp.mongodb.net/addisplay?retryWrites=true&w=majority")

        console.log(`DB connected ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = ConnectDB
