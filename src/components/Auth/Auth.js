import React, {Component} from 'react';
import './Auth.css'
import axios from 'axios';
import Nav from '../Nav/Nav';

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
    }
  }

  async login() {
    const {loginUsername, loginPassword} = this.state;
    let res = await axios.post('/auth/login', {username: loginUsername, password: loginPassword})
    if(res.data.userData && res.data.userData.admin === 'yes') {
      this.props.history.push('/dashboard')
    } else if (res.data.userData) {
      this.props.history.push(`/employee/${res.data.userData.id}`)
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
    </div>
    )
  }
}