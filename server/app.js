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
app.use('/rate-review', rateReview);
// app.use(testPathFn()) // test for paths


// routes

// media
const gallery = {
    dir:path.resolve(__dirname,'gallery'),
    err: 'Gallery: Ensure the path is correct and fs/fs:node is installed',
    getFiles: function getFiles(res){
        let result = fs.readdirSync(gallery.dir);
        if(!result) throw new Error(gallery.err);

        return result.map(file => {
            let split = file.split`.`
            let ext = split[split.length - 1];
            let buffer = fs.readFileSync(path.resolve(__dirname,'gallery',file));
            return {filename:file,data:`data:image/${ext};base64,${buffer.toString('base64')}`}
        });
    }
}

// get gallery
app.route('/gallery/media').get((req,res) => {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    let files = gallery.getFiles();
    res.json({media:files});
})

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