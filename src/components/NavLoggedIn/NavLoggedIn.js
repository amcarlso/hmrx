import React, {Component} from 'react';
import './NavLoggedIn.css';
import logo from '../../images/logo.png';
import axios from 'axios';
import {getUserData} from '../../ducks/reducer';
import {userLogout} from '../../ducks/reducer';
import {connect} from 'react-redux';

class NavLoggedIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      userData: {}
    }

    this.clearUser = this.clearUser.bind(this);
  }
 
  
  async componentDidMount(){
    const res = await axios.get('/api/user-data')
    // console.log(res.data)
    this.setState({userData: res.data, loggedIn: res.data.loggedIn})
    this.props.getUserData(res.data)
  }

  clearUser() {
    this.props.userLogout()
    this.ToggleLoggedIn()
  }

  ToggleLoggedIn() {
    const {loggedIn} = this.state;
    this.setState({loggedIn: !loggedIn})
  }

  render() {
    const {loggedIn} = this.state;
    console.log(this.props);
    // console.log(this.state.userData)
    return (
      <div id='nav-spacing'>
        <img src={logo} alt='HMRX logo' className='logo'/>
        {loggedIn ? 
        <div>
          <div>
            <span id='welcome'>{`Welcome, ${this.props.user.name}`}</span>
            <a href='http://localhost:4321/auth/logout'>
              <button onClick={() => this.clearUser()} className='button-styling'>Log Out</button>
            </a>
          </div>
        </div> : null}
      </div>
    )
  } 
}
function mapStateToProps(state) {
  return state;
} 

export default connect(mapStateToProps, {getUserData, userLogout})(NavLoggedIn);