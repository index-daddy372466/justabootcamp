require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const cors = require('cors')
const path = require('path')
const PORT=process.env.PORT || 3002
const rateReview = require('./rating.js')
// route objects
const route = {
    public: '../public',
    rating: '../public/rating'
}

// middleware
app.use(express.static(path.resolve(__dirname,route.public)))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/rate-review', rateReview)
// app.use(testPathFn()) // test for paths


// routes



// listen
app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`)
})


// functions
function testPathFn(req,res,next){
    const {path} = req;

    if(path){
        console.log(path)
    }

    next()
}