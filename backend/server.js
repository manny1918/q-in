const express = require('express')
const dovenv = require('dotenv').config()
const port = process.env.PORT|| 5000

const app = express()

app.get('/', (req, res)=>{
    res.send('Welcome home!')
})

app.listen(port, ()=>{
    console.log(`LISTENING ON PORT ${port}`)
})