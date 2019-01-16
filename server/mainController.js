const bcrypt = require('bcryptjs');
module.exports = {
  getAllEmployees: (req, res) => {
    const db = req.app.get('db');
    const employerId = req.session.user.id;
    db.get_all_employees({id: employerId})
    .then( response => {
      // console.log(response)
      res.status(200).send(response)
    })
    .catch( err => {
      console.log('could not get employees')
    })
  },
  addEmployee: (req, res) => {
    const db = req.app.get('db');
    const {name, username, password, email, image, salary, position} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const employerId = req.session.user.id;
    let userInfo = {};
    db.add_employee_user({ name: name, username: username, hash: hash, email: email})
    .then( response => {
      let userId = response[0].id
      userInfo = response[0]
      db.add_employee_info({userId: userId, image: image, salary: salary, position: position, employerId: employerId})
      .then( response => {
        userInfo = {...userInfo, ...response[0]}
        res.status(200).send(userInfo)
        console.log(userInfo)
        // userInfo = Object.assign({}, userInfo, response[0])
      })
    })
  }
}