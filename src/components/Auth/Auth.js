import React, {Component} from 'react';
import './Auth.css'
import axios from 'axios';
import Nav from '../Nav/Nav';
import Swal from 'sweetalert2';

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
      regPassword: ''
    }
  }

  async register() {
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

  async login() {
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
    console.log(res.data)
  }

  render(){
    return(
    <div id='background'>
      <Nav />
      <div id='header'>
          <h1>Human Resources Simplified</h1>
        </div>
      {/* <div className='auth-content-display'> */}
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
            <input placeholder='username' onChange={(e) => this.setState({regUsername: e.target.value})} />
            <br/>
            <input placeholder='password' onChange={(e) => this.setState({regPassword: e.target.value})} type='password' />
            <br/>
            <input placeholder='phone ##########' onChange={(e) => this.setState({regPhone: e.target.value})} />
            <br/>
            <input placeholder='email@email.com' onChange={(e) => this.setState({regEmail: e.target.value})} />
            <button className='button-styling' onClick={() => this.register()}>Enter</button>
          </div>
        </div>
      {/* </div> */}
    </div>
    )
  }
}