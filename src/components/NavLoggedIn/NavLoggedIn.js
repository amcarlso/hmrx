import React, {Component} from 'react';
import './NavLoggedIn.css';
import logo from '../../images/logo.png';
import axios from 'axios';
import {getUserData} from '../../ducks/reducer';
import {connect} from 'react-redux';

class NavLoggedIn extends Component {
 
  
  async componentDidMount(){
    const res = await axios.get('/api/user-data')
    console.log(res)
    this.props.getUserData(res.data)
  }

  

  render() {
    console.log(this.props)
    return (
      <div id='nav-spacing'>
        <img src={logo} alt='HMRX logo' className='logo'/>
        <div>
           
          <div>
            <span id='welcome'>{`Welcome, ${this.props.user.name}`}</span>
            <a href='http://localhost:4321/auth/logout'>
              <button className='button-styling'>Log Out</button>
            </a>
          </div>
        </div>
      </div>
    )
  } 
}
const mapStateToProps = (state) => state;

export default connect(mapStateToProps, {getUserData})(NavLoggedIn);