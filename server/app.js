require('dotenv').config()
const initializePassport = require('./accounts/passport.js')
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


// routes
app.route('/gallery/media2').get((req,res) => {
    // res.setHeader('Cache-Control', 'public, madx-age-3600')

    let files = fs.readFileSync(path.resolve(__dirname,'galleryv2','files.json'), {encoding:'utf-8'})
    res.json({dataset:files})
})

// USER REGISTRATION (SIGNUP) ROUTE

app.get('/register', (req, res) => {
    const register = 'register.html'
    res.sendFile(path.resolve(__dirname,route.public,register))
})
app.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, username, password } = req.body;

    let users = undefined

    console.log(users)
    // Check if user already exists
    if (users) {
      return res.status(400).send('User already exists.');
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user data to your database
    const newUser = { firstname, lastname, email:username, password: hashedPassword };

    res.status(201).send('User registered successfully! You can now log in.');
  } catch {
    res.status(500).send('Error registering user.');
  }
});

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