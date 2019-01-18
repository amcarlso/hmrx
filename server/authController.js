const bcrypt = require('bcryptjs');
const {EMAIL, PASSWORD, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER} = process.env
const nodemailer = require('nodemailer');
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
require('dotenv').config();


module.exports = {
  register: async (req, res) => {
    const {name, username, password, phone, email} = req.body;
    const db = req.app.get('db');
    const userUsername = await db.find_user_username({username: username});
    // NODEMAILER
    nodemailer.createTestAccount((err, account) => {
      const htmlEmail = `
        <h3>Contact Details</h3>
        <ul>
          <li>Name: ${name}</li>
          <li>Email: ${email}</li>
        </ul>
        <h3>Message</h3>
        <p>Thank you for signing up for HMRX. No payment is required at this time. You will be prompted to pay when you attempt to add employees</p>
      `
      const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
      });
      let mailOptions = {
        from: EMAIL,
        to: email,
        replyTo: EMAIL,
        subject: 'New Message',
        text: 'Thank you for signing up for HMRX. No payment is required at this time. You will be prompted to pay when you attempt to add employees',
        html: htmlEmail
      }
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return console.log(err)
        } else {
          console.log('Message Sent')
        }
      })
    })
    //
    
    //TWILIO
    client.messages
    .create({
      from: TWILIO_PHONE_NUMBER,
      to: `+1${phone}`,
      body: 'Thank you for signing up for HMRX. No payment is required at this time. You will be prompted to pay when you attempt to add employees'
    })
    .then(res => {
      console.log(res)
    })
    
    //

    if(userUsername.length >= 1) {
      res.status(200).send({message: 'username already in use'})
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUserArr = await db.new_boss({name: name, username: username, hash: hash, email: email, phone: phone});
    req.session.user = {
      id: newUserArr[0].id,
      name: newUserArr[0].username,
      admin: newUserArr[0].admin,
      email: newUserArr[0].email
    };
    console.log(req.session.user)
    res.status(200).send({message: 'logged in', userData: req.session.user, loggedIn: true})
  },
  login: async (req, res) => {
    const db = req.app.get('db');
    const {username, password} = req.body;
    const userUsername = await db.find_user_username({username: username});
    if(!userUsername) {
      res.status(200).send({message: 'username not found'});
    }
    const result = bcrypt.compareSync(password, userUsername[0].hash);
    if(!result) {
      res.status(401).send({message: 'password incorrect'})
    }
    req.session.user = {
      id: userUsername[0].id,
      name: userUsername[0].username,
      admin: userUsername[0].admin,
      email: userUsername[0].email,
      loggedIn: true
    };
    console.log(req.session.user)
    res.status(200).send({message:'logged in', userData: req.session.user, loggedIn: true})
  },
  logout: (req, res) => {
    req.session.destroy();
    res.redirect('http://localhost:3000/#/');
    // console.log(req.session.user)
  },
  charge: async (req, res) => {
    try {
      let {status} = await stripe.charges.create({
        amount: 2000,
        currency: "usd",
        description: "An example charge",
        source: req.body
      });
  
      res.json({status});
    } catch (err) {
      res.status(500).end();
    }
  }
}