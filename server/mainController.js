const bcrypt = require('bcryptjs');

module.exports = {
  getAllEmployees: (req, res) => {
    const db = req.app.get('db');
    const employerId = req.session.user.id;
    db.get_all_employees({id: employerId})
    .then( response => {
      res.status(200).send(response)
    })
    .catch( err => {
      console.log('could not get employees')
    })
  },
  addEmployee: async (req, res) => {
    const db = req.app.get('db');
    const {name, username, password, email, image, salary, position} = req.body;
    const userUsername = await db.find_user_username({username: username});
    if(userUsername.length >= 1) {
      return res.status(200).send({message: 'username already in use'})
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const employerId = req.session.user.id;
    let userInfo = {};
    const responseOne = await db.add_employee_user({ name: name, username: username, hash: hash, email: email})
    let userId = responseOne[0].id;
    userInfo = responseOne[0];
    // .then( response => {
    //   let userId = response[0].id
    //   userInfo = response[0]
    const responseTwo = await db.add_employee_info({userId: userId, image: image, salary: salary, position: position, employerId: employerId})
    userInfo = {...userInfo, ...responseTwo[0]}
      // .then( response2 => {
      //   userInfo = {...userInfo, ...response2[0]}  // ... OR... userInfo = Object.assign({}, userInfo, response[0])
    res.status(200).send({userInfo: userInfo, session: req.session.user})
  },
  getUser: (req, res) => {
    if(req.session.user) {
      res.status(200).send({userData: req.session.user, loggedIn: true})
    } else {
      res.status(401).send('Please log in.')
    }
  },
  deleteEmployee: async (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    let res1 = await db.delete_info({userId: id});
    let res2 = await db.delete_user({userId: id});
    let res3 = await db.get_all_employees({id: req.session.user.id})
    res.status(200).send(res3)
  },
  getEmployeeInfo: async (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    let res1 = await db.get_employee({id: Number(id)});
    res.status(200).send(res1[0])
  },
  editSalary: async (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    const {salary} = req.body;
    let res1 = await db.edit_employee_salary({salary: salary, employeeId: id});
    let res2 = await db.get_employee({id: Number(id)});
    res.status(200).send(res2[0]);
  },
  editPaid: async (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    let res1 = await db.edit_paid({id: Number(id)});
    req.session.user = res1[0];
    res.status(200).send(res1[0]);
  },
  getPunches: async (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    let res1 = await db.get_punches({id: Number(id)});
    res.status(200).send(res1);
  },
  addPunchIn: async (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    const {punchIn} = req.body;
    let res1 = await db.add_punch_in({punchIn: punchIn, employeeId: Number(id)});
    res.status(200).send(res1);
  },
  addPunchOut: async (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    const {punchOut} = req.body;
    let res1 = await db.add_punch_out({punchOut: punchOut, employeeId: Number(id)})
    res.status(200).send(res1);
  }
}