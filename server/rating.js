// vars
require('dotenv').config()
const express = require('express')
const router = express.Router();
const path = require('path')
const nodemailer = require('nodemailer')


const route = {
    public: '../public',
    rating: '../public/rating'
}

// node mailer / transporter
const transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port: 587,
    secure : false,
    auth:{
        user:process.env.TEST_EMAIL,
        pass:process.env.TEST_APP_PW
    },
    tls:{
        rejectUnauthorized:false
    }
})


// middleware
router.use(express.static(path.resolve(__dirname, route.rating)));


// routes
router.post('/api/send-review', async (req,res) =>{
    // const {reviewText} = req.body
    const {test} = req.body

    console.log(req.body)
    console.log(test)

    try{
        const mailOptions = {
            from: process.env.JAB_EMAIL,
            to: process.env.JAB_EMAIL,
            subject: 'Anonymouse User Review',
            // text: 'You have received a new anonymous review:\n\n' + reviewText
            text: 'You have received a new anonymous review:\n\n' + test
        }

        await transporter.sendMail(mailOptions);
        res.status(200).json({success:true, message: 'Review sent successfully'})
    }
    catch(err){
        console.error('Error sending mail:',err)

        res.status(500).json({success:false, message: 'Failed to send review.'})

    }
})


module.exports = router