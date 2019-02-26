import React, {Component} from 'react';
import './Auth.css'
import axios from 'axios';
import Nav from '../Nav/Nav';
import Swal from 'sweetalert2';
import Register from './Register';
import Login from './Login';

export default class Auth extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loginUsername: '',
      loginPassword: '',
      regName: '',
      regPhone: '',
      regEmail: '',
      regUsername: '',
      regPassword: '',
      registerToggle: false,
      loginToggle: false
    }
  }

  handleLogToggle = () => {
    this.setState({
      registerToggle: false,
      loginToggle: !this.state.loginToggle
    })
  }

  handleRegToggle = () => {
    this.setState({
      loginToggle: false,
      registerToggle: !this.state.registerToggle
    })
  }

  register = async () => {
    const {regName, regPhone, regEmail, regUsername, regPassword} = this.state;
    let res = await axios.post('/auth/register', {name: regName, phone: regPhone, email: regEmail, username: regUsername, password: regPassword});
    if(res.data.loggedIn) {
      this.props.history.push('/dashboard')
    } else {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Username Taken. Please select another username.'
      })
    }
  }

  login = async () => {
    const {loginUsername, loginPassword} = this.state;
    let res = await axios.post('/auth/login', {username: loginUsername, password: loginPassword})
    if(res.data.userData && res.data.userData.admin === 'yes') {
      Swal.fire({
        position: 'center',
        type: 'success',
        title: `Welcome back, ${res.data.userData.name}`,
        showConfirmButton: false,
        timer: 1200
      })
      this.props.history.push('/dashboard')
    } else if (res.data.userData) {
      this.props.history.push(`/employee/${res.data.userData.id}`)
    } else if (res.data.allGoodOne === false) {
      Swal.fire(
        'Username not found.',
        'Please try again.',
        'question'
      )
    } else if (res.data.allGoodTwo === false) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Incorrect password. please try again.'
      })
    }
  }

  handleKeyDownLogin = evt => {
    if (evt.keyCode === 13) {
      this.login();
    }
  }

  handleKeyDownRegister = evt => {
    if (evt.keyCode === 13) {
      this.register();
    }
  }

  handleInput = (prop, e) => {
    this.setState({
      [prop]: e.target.value
    })
  }

  render(){
    const {loginToggle, registerToggle} = this.state;
    return(
    <div id='background'>
      <Nav regTogFn={this.handleRegToggle} logTogFn={this.handleLogToggle} />
      <div id='header'>
          <h1>Human Resources Simplified</h1>
        </div>
      {/* <div className='auth-content-display'> */}
        <div id='options-spacing'>
          {!loginToggle && !registerToggle ? null : registerToggle && !loginToggle ? <Register regFn={this.register} keyDownReg={this.handleKeyDownRegister} regTogFn={this.handleRegToggle} handleInput={this.handleInput}/> : (
            loginToggle && !registerToggle ? <Login  logFn={this.login} keyDownLog={this.handleKeyDownLogin} logTogFn={this.handleLogToggle} handleInput={this.handleInput}/> : null)
          }
          
          
        </div>
      {/* </div> */}
    </div>
    )
  }
}