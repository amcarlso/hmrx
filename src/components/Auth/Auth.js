import React, {Component} from 'react';
import './Auth.css'
import axios from 'axios';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';

export default class Auth extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loginUsername: '',
      loginPassword: '',
      regName: '',
      regEmail: '',
      regUsername: '',
      regPassword: ''
    }
  }

  async register() {
    const {regName, regEmail, regUsername, regPassword} = this.state;
    let res = await axios.post('/auth/register', {name: regName, email: regEmail, username: regUsername, password: regPassword});
    if(res.data.loggedIn) {
      this.props.history.push('/dashboard')
    }
  }

  async login() {
    const {loginUsername, loginPassword} = this.state;
    let res = await axios.post('/auth/login', {username: loginUsername, password: loginPassword})
    if(res.data.loggedIn && res.data.userData.admin === 'yes') {
      this.props.history.push('/dashboard')
    } else if (res.data.loggedIn) {
      this.props.history.push(`/employee/:${res.data.userData.id}`)
    }
    console.log(res.data)
  }

  render(){
    return(
    <div id='background'>
      <Nav />
      <div id='header'>
        <h1>Human Resources simplified</h1>
      </div>
      <div id='options-spacing'>
        <div className='option-container'>
        <p id='sign-in'>Sign In</p>
        <input placeholder='username' onChange={(e) => this.setState({loginUsername: e.target.value})} />
        <br/>
        <input placeholder='password' onChange={(e) => this.setState({loginPassword: e.target.value})} type='password' />
        <br/>
        <button className='button-styling' onClick={() => this.login()}>Enter</button>
        </div>

        <div className='option-container'>
          <p id='register'>Register</p>
          <input placeholder='name' onChange={(e) => this.setState({regName: e.target.value})} />
          <br/>
          <input placeholder='email' onChange={(e) => this.setState({regEmail: e.target.value})} />
          <br/>
          <input placeholder='username' onChange={(e) => this.setState({regUsername: e.target.value})} />
          <br/>
          <input placeholder='password' onChange={(e) => this.setState({regPassword: e.target.value})} type='password' />
          <br/>
          <button className='button-styling' onClick={() => this.register()}>Register</button>
        </div>
      </div>
    </div>
    )
  }
}