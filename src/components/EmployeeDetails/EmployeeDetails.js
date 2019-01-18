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
      userInfo: {},
      employeeInfo: {},
      editClicked: false,
      salaryInput: ''
    }
    this.handleToggleEdit = this.handleToggleEdit.bind(this);
    this.editSalary = this.editSalary.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  async componentDidMount() {
    try {
      const userData = await axios.get('/api/user-data')
      console.log(userData.data)
      if(userData.data) {
        this.setState({userInfo: userData.data})
        await this.getEmployeeInfo()
      }
    } catch(error) {
      console.log(error)
      alert("Please sign in...")
      this.props.history.push('/')
    } 
  }
  
  
  
  handleToggleEdit() {
    const {editClicked} = this.state;
    if(!editClicked) {
      this.setState({editClicked: true})
    } else {
      this.setState({editClicked: false})
    }
  }
  getEmployeeInfo() {
  axios.get(`/api/employees/${this.props.match.params.employeeid}`)
    .then( res => {
      this.setState({employeeInfo: res.data})
      console.log(res.data)
    })
  }
  editSalary(editedSalary) {
    axios.put(`/api/employees/${this.props.match.params.employeeid}`, {salary: editedSalary})
    .then( res => {
      this.setState({employeeInfo: res.data})
      console.log({message: `Here's ${res.data.name}'s updated salary: ${res.data.salary}/hour`})
    });
    this.handleToggleEdit();
  }
  handleCancel() {
    this.setState({salaryInput: ''});
    this.handleToggleEdit();
  }

  render(){
    // console.log(this.state.userInfo)
    const {editClicked, salaryInput, userInfo} = this.state;
    const { name, username, email, image_url, position, salary } = this.state.employeeInfo;
    return(
      <div>
        <NavLoggedIn />
        <div className='body-container'>
          {userInfo.admin === 'yes' ? <Link to='/dashboard'><img src={backButton} alt='back' id='back-icon'/></Link> : null}
          <div className='profile-container'>
            <div>
              <img src={image_url} alt='employee-pic' id='picture'/>
            </div>
            <div className='info-container'>
              <div>Name: {name}</div> <br/>
              <div>position: {position}</div> <br/>
              <div>
                {editClicked ? 
                <div className='salary-spacing'>
                  <input onChange={(e) => this.setState({salaryInput: e.target.value})}/>
                  <button className='buttons' onClick={() => this.editSalary(salaryInput)}>Save</button>
                  <button className='buttons' onClick={() => this.handleCancel()}>Cancel</button>
                </div> : 
                <div className='salary-spacing'>
                  <div>Salary: ${salary} / hour</div>{userInfo.admin === 'yes' ? <button className='buttons' onClick={() => this.handleToggleEdit()}>Edit</button> : null}
                </div>}
              </div> <br/>
              <div>Username: {username}</div> <br/>
              <div>Email: {email}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

