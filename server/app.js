require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const cors = require('cors')
const path = require('path')
const PORT=process.env.PORT || 3002

// route objects
const route = {
    public: '../public'
}



// middleware
app.use(express.static(path.resolve(__dirname,route.public)))
app.use(cors())
app.use(function(req,res,next){
    const {path} = req;

    if(path){
        console.log(path)
    }

    next()
})


// routes



// listen
app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`)
})