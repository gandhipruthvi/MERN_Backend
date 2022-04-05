const express = require("express");
const nodemailer = require('nodemailer');
const router = express.Router();

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "BestBidApp@gmail.com",
        pass: "szjzmkzuncjlelpx",
    },
});

contactEmail.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to Send");
    }
});

router.post("/", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const mail = {
        from: name,
        to: "bestbidapp@gmail.com",
        subject: "Contact Form Submission",
        html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
    };

    contactEmail.sendMail(mail, (error, info) => {
        if (error) {
            console.log(error);
            return res.send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            return res.send('Email Sent');
        }
    });
});



module.exports = router;