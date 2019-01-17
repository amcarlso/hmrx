import React, {Component} from 'react';
import NavLoggedIn from '../NavLoggedIn/NavLoggedIn';
import './EmployeeDetails.css'
import backButton from '../../images/back.png'
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class EmployeeDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employeeInfo: {},
      editClicked: false,
      salaryInput: ''
    }
  }
  componentDidMount() {
    this.getEmployeeInfo()  
  }

  getEmployeeInfo() {
  axios.get(`/api/employees/${this.props.match.params.employeeid}`)
    .then( res => {
      this.setState({employeeInfo: res.data})
      console.log(this.state.employeeInfo)
    })
  }
  render(){
    const { name, username, email, image_url, position, salary } = this.state.employeeInfo;
    return(
      <div>
        <NavLoggedIn />
        <div className='body-container'>
          <Link to='/dashboard'><img src={backButton} alt='back' id='back-icon'/></Link>
          <div className='profile-container'>
            <div>
              <img src={image_url} alt='employee-pic' id='picture'/>
            </div>
            <div className='info-container'>
              <div>Name: {name}</div>
              <br/>
              <div>position: {position}</div>
              <br/>
              <div id='salary-spacing'>
                <div>Salary: ${salary} / hour</div>
                <button className='edit-button'>Edit</button>
              </div>
              <br/>
              <div>Username: {username}</div>
              <br/>
              <div>Email: {email}</div>
            </div>
            
          </div>
        </div>
        
      </div>
    )
  }
}