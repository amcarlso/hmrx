const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    const {name, username, password, email} = req.body;
    const db = req.app.get('db');
    const userUsername = await db.find_user_username({username: username});
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
  }
}