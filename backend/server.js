const express = require('express')
const colors = require('colors')
const dovenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT|| 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res)=>{
    res.send('Welcome home!')
})

app.use('/api/users', require('./routes/userRoute'))
app.use('/api/services', require('./routes/serviceRoute'))

app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`LISTENING ON PORT ${port}`)
})