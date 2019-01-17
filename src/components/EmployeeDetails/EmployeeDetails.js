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
    this.handleToggleEdit = this.handleToggleEdit.bind(this);
    this.editSalary = this.editSalary.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.getEmployeeInfo()  
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
      console.log(this.state.employeeInfo)
    })
  }
  editSalary(editedSalary) {
    axios.post(`/api/employees/${this.props.match.params.employeeid}`, {salary: editedSalary})
    .then( res => {
      console.log(res.data)
    });
    this.handleToggleEdit();
  }
  handleCancel() {
    this.setState({salaryInput: ''});
    this.handleToggleEdit();
  }

  render(){
    const {editClicked, salaryInput} = this.state;
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
              <div>Name: {name}</div> <br/>
              <div>position: {position}</div> <br/>
              <div>
                {editClicked ? 
                <div className='salary-spacing'>
                  <input onChange={(e) => this.setState({salaryInput: e.target.value})}/>
                  <button onClick={() => this.editSalary(salaryInput)}>Save</button>
                  <button onClick={() => this.handleCancel()}>Cancel</button>
                </div> : 
                <div className='salary-spacing'>
                  <div>Salary: ${salary} / hour</div><button className='edit-button' onClick={() => this.handleToggleEdit()}>Edit</button>
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