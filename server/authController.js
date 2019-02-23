const bcrypt = require('bcryptjs');
const {EMAIL, PASSWORD, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, SECRET_KEY, REACT_APP_LOGIN} = process.env
const nodemailer = require('nodemailer');
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const stripe = require("stripe")(SECRET_KEY);
require('dotenv').config();

module.exports = {
  register: async (req, res) => {
    const {name, username, password, phone, email} = req.body;
    const db = req.app.get('db');
    const userUsername = await db.find_user_username({username: username});
    if(userUsername.length >= 1) {
      return res.status(200).send({message: 'username already in use'})
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUserArr = await db.new_boss({name: name, username: username, hash: hash, email: email, phone: phone});
    req.session.user = {
      id: newUserArr[0].id,
      name: newUserArr[0].username,
      admin: newUserArr[0].admin,
      email: newUserArr[0].email,
      paid: newUserArr[0].paid,
      loggedIn: true
    };
    res.status(200).send({message: 'logged in', userData: req.session.user, loggedIn: true})

    // NODEMAILER
    nodemailer.createTestAccount((err, account) => {
      const htmlEmail = `
        <h3>Contact Details</h3>
        <ul>
          <li>Name: ${name}</li>
          <li>Email: ${email}</li>
        </ul>
        <h3>Message</h3>
        <p>${name}, Thank you for signing up for HMRX. No payment is required at this time. You will be prompted to pay when you attempt to add employees</p>
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
        subject: 'HMRX Registration',
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
    //TWILIO
    client.messages
    .create({
      from: TWILIO_PHONE_NUMBER,
      to: `+1${phone}`,
      body: 'Thank you for signing up for HMRX. No payment is required at this time. You will be prompted to pay when you attempt to add employees'
    })
  },
  login: async (req, res) => {
    const db = req.app.get('db');
    const {username, password} = req.body;
    const userUsername = await db.find_user_username({username: username});
    if(userUsername.length === 0) {
      return res.status(200).send({message: 'username not found', allGoodOne: false});
    }
    const result = bcrypt.compareSync(password, userUsername[0].hash);
    if(!result) {
      return res.status(200).send({message: 'password incorrect', allGoodTwo: false})
    }
    req.session.user = {
      id: userUsername[0].id,
      name: userUsername[0].username,
      admin: userUsername[0].admin,
      email: userUsername[0].email,
      paid: userUsername[0].paid,
      loggedIn: true
    };
    res.status(200).send({message:'logged in', userData: req.session.user, loggedIn: true})
  },
  logout: (req, res) => {
    req.session.destroy();
    res.redirect(`${REACT_APP_LOGIN}/#/`);
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