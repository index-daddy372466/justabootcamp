require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const cors = require('cors')
const path = require('path')
const PORT=process.env.PORT || 3002
const rateReview = require('../public/rating.js')
const fs = require('node:fs')
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

// media
const gallery = {
    dir:path.resolve(__dirname,'gallery'),
    err: 'Gallery: Ensure the path is correct and fs/fs:node is installed',
    getFiles: function getFiles(){
        let result = fs.readdirSync(gallery.dir);
        if(!result) throw new Error(gallery.err);

        return result;
    }
}

// get gallery
app.route('/gallery/media').get((req,res) => {
    let files = gallery.getFiles()||[]
    // console.log(files)
    res.json({media:files})
})


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