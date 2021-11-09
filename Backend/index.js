require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')


const orderRoutes = require('./routes/orderRoutes')

app.use(cors())

//Forma de ler JSON/

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())


app.use(orderRoutes)
//Rota incial

app.get('/', (req, res) => {
    res.json({
        message: "Oi Express!"
    })
})

//Entregar uma porta

const DB_user = process.env.DB_USER;
const DB_password = encodeURIComponent(process.env.DB_password)

mongoose.connect(`mongodb+srv://${DB_user}:${DB_password}@apicluster.zruzt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)

    .then(() => {
        console.log("Conectamos ao Mongo DB!")
        app.listen(3000)
    })
    .catch((err) => console.log(err))