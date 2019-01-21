import React, {Component} from 'react';
import NavLoggedIn from '../NavLoggedIn/NavLoggedIn';
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

  async componentDidMount() {
    try {
      await axios.get('/api/user-data');
    } catch {
        alert("Please sign in...")
        this.props.history.push('/')
    }
  }

  addEmployee() {
    const {name, username, password, email, image, salary, position} = this.state;
    axios.post('/api/employees', {name: name, username: username, password: password, email: email, image: image, salary: salary, position: position})
    .then( res => {
      this.props.history.push('/dashboard')
    })
  }

  render(){
    return(
      <div className='background'>
        <NavLoggedIn />
        <div id='form-container'>
          <div>
          <p id='form-title'>New Employee</p>
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
          
          <button className='new-buttons' onClick={() => this.addEmployee()}>Add</button>
          <Link to='/dashboard'><button className='new-buttons'>Cancel</button></Link>
        </div>
      </div>
    )
  }
}