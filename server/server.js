const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const massive = require('massive');
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
const session = require('express-session');
const authCtrl = require('./authController');
const mainCtrl = require('./mainController');
const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT, NODE_ENV} = process.env;

const app = express();

app.use(express.json());
app.use(require("body-parser").text());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
console.log(NODE_ENV)
app.use(async (req, res, next) => {
  if(NODE_ENV === 'development' && !req.session.user){
      const db = req.app.get('db')
      const userData = await db.set_data()
      req.session.user = userData[0]
      next()
  }else{
      next()
  }
});


massive(CONNECTION_STRING).then( db => {
  console.log('connected to db')
  app.set('db', db);
  app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
  });
});

app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);
app.get('/api/employees', mainCtrl.getAllEmployees);
app.post('/api/employees', mainCtrl.addEmployee);
app.get('/api/user-data', mainCtrl.getUser);
app.delete('/api/employees/:id', mainCtrl.deleteEmployee);
app.get('/api/employees/:id', mainCtrl.getEmployeeInfo);
app.put('/api/employees/:id', mainCtrl.editSalary);
app.post("/charge", authCtrl.charge);
app.put('/api/user-data/:id', mainCtrl.editPaid);
app.get('/api/punches/:id', mainCtrl.getPunches);
app.post('/api/punches/:id', mainCtrl.addPunchIn);
app.put('/api/punches/:id', mainCtrl.addPunchOut);