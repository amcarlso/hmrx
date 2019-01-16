import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import './NewEmployee.css'
import {Link} from 'react-router-dom';
import axios from 'axios';


export default class NewEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      username: '',
      password: '',
      email: '',
      image: '',
      salary: '',
      position: ''
    }
  }

  async addEmployee() {
    const {name, username, password, email, image, salary, position} = this.state;
    await axios.post('/api/employees', {name: name, username: username, password: password, email: email, image: image, salary: salary, position: position})
  }

  render(){
    return(
      <div>
        {(this.props.location.pathname !== '/') ? <Nav /> : null}
        <div id='form-container'>
          <div>
          <p id='form-title'>Add Employee</p>
          </div>
          <div>
            <span id='subject-title'>Name:</span>
            <br/>
            <input onChange={(e) => this.setState({name: e.target.value})} />
            <br/>
            <span id='subject-title'>Username:</span>
            <br/>
            <input onChange={(e) => this.setState({username: e.target.value})} />
            <br/>
            <span id='subject-title'>Password:</span>
            <br/>
            <input onChange={(e) => this.setState({password: e.target.value})} />
            <br/>
            <span id='subject-title'>Email:</span>
            <br/>
            <input onChange={(e) => this.setState({email: e.target.value})} />
            <br/>
            <span id='subject-title'>Image:</span>
            <br/>
            <input onChange={(e) => this.setState({image: e.target.value})} />
            <br/>
            <span id='subject-title'>Salary:</span>
            <br/>
            <input onChange={(e) => this.setState({salary: e.target.value})} />
            <br/>
            <span id='subject-title'>Position:</span>
            <br/>
            <input onChange={(e) => this.setState({position: e.target.value})} />
            <br/>
          </div>
          
          <button onClick={() => this.addEmployee()}>Complete</button>
          <Link to='/dashboard'><button>Cancel</button></Link>
        </div>
      </div>
    )
  }
}