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
      .then( response2 => {
        userInfo = {...userInfo, ...response2[0]}  // ... OR... userInfo = Object.assign({}, userInfo, response[0])
        res.status(200).send({userInfo: userInfo, session: req.session.user})
        // console.log(userInfo)
        // console.log(response2[0])
      })
    })
  },
  getUser: (req, res) => {
    if(req.session.user) {
      res.status(200).send(req.session.user)
    } else {
      res.status(401).send('Please log in.')
    }
  },
  deleteEmployee: async (req, res) => {
    // console.log(req.session.user.id)
    const db = req.app.get('db');
    const {id} = req.params;
    let res1 = await db.delete_info({userId: id});
    let res2 = await db.delete_user({userId: id});
    let res3 = await db.get_all_employees({id: req.session.user.id})
    res.status(200).send(res3)
    // console.log(res3)
  },
  getEmployeeInfo: async (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    let res1 = await db.get_employee({id: Number(id)});
    // console.log(res1[0])
    res.status(200).send(res1[0])
  },
  editSalary: async (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    const {salary} = req.body;
    let res1 = await db.edit_employee_salary({salary: salary, employeeId: id});
    let res2 = await db.get_employee({id: Number(id)});
    // console.log(res2[0]);
    res.status(200).send(res2[0]);
  },
  editPaid: async (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    let res1 = await db.edit_paid({id: Number(id)});
    req.session.user = res1[0];
    res.status(200).send(res1[0])
  }
}