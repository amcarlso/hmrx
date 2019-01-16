import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Auth from './components/Auth/Auth';
import EmployerDashboard from './components/EmployerDashboard/EmployerDashboard';
import EmployeeDetails from './components/EmployeeDetails/EmployeeDetails';
import NewEmployee from './components/NewEmployee/NewEmployee';

export default(
  <Switch>
    <Route exact path='/' component={Auth}/>
    <Route path='/dashboard' component={EmployerDashboard}/>
    <Route path='/employee/:employeeid' component={EmployeeDetails}/>
    <Route path='/new' component={NewEmployee}/>
  </Switch>
)