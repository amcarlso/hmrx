const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


module.exports = {
  register: async (req, res) => {
    const {name, username, password, email} = req.body;
    const db = req.app.get('db');
    const userUsername = await db.find_user_username({username: username});
    // 
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
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'fi7ct2cjoifdsfcj@ethereal.email',
            pass: 'xmQrWxuJa8M9gHtSHf'
        }
      });

      let mailOptions = {
        from: 'fi7ct2cjoifdsfcj@ethereal.email',
        to: `${email}`,
        replyTo: 'fi7ct2cjoifdsfcj@ethereal.email',
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
    if(userUsername.length >= 1) {
      res.status(200).send({message: 'username already in use'})
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUserArr = await db.new_boss({name: name, username: username, hash: hash, email: email});
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
      email: userUsername[0].email
    };
    console.log(req.session.user)
    res.status(200).send({message:'logged in', userData: req.session.user, loggedIn: true})
  },
  logout: (req, res) => {
    req.session.destroy();
    res.redirect('http://localhost:3000/#/')
  }
}