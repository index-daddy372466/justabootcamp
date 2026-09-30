// vars
require('dotenv').config()
const express = require('express')
const router = express.Router();
const path = require('path')
const nodemailer = require('nodemailer')


const route = {
    public: '../../public',
    pft: '../../public/pft'
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
router.use(express.json())
router.use(express.urlencoded({extended:true}))
router.use(express.static(path.resolve(__dirname, route.pft)));


// routes
router.post('/api/send-request', async (req,res) =>{
    const {fname,lname,email,feet,inches,weight,gender,request} = req.body

    console.log(req.body);

    try{
        const mailOptions = {
            from: process.env.JAB_EMAIL,
            to: process.env.JAB_EMAIL,
            subject: 'Personal Fitness Training Request',
            text: `
            Name: ${fname} ${lname}
            Email: ${email}
            Height: ${feet} ${inches}
            Weight: ${weight}
            Description: ${request}`,
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