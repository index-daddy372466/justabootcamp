require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const cors = require('cors')
const path = require('path')
const PORT=process.env.PORT || 3002
const rateReview = require('./routes/rating.js')
const premium = require('./routes/premium.js')

const fs = require('node:fs')
// route objects
const route = {
    public: '../public',
    rating: '../public/rating'
}

// middleware
app.use('/rate-review', rateReview);
app.use('/premium', premium);
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve(__dirname,route.public)))

app.use(cors())
// app.use(testPathFn()) // test for paths


// routes

app.route('/gallery/media2').get((req,res) => {
    // res.setHeader('Cache-Control', 'public, madx-age-3600')

    let files = fs.readFileSync(path.resolve(__dirname,'galleryv2','files.json'), {encoding:'utf-8'})
    res.json({dataset:files})
})

// listen
app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`)
})


// functions
// function testPathFn(req,res,next){
//     const {path} = req;

//     if(path){
//         console.log(path)
//     }

//     next()
// }