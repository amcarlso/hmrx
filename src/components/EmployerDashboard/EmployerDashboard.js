import React, {Component} from 'react';
import NavLoggedIn from '../NavLoggedIn/NavLoggedIn';
import axios from 'axios';
import {Link} from 'react-router-dom';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import './EmployerDashboard.css'
import {connect} from 'react-redux';

class EmployerDashboard extends Component {
  constructor(props){
    super(props)

    this.state = {
      employees: []
    }
    
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    this.getEmployees()
  }

  async getEmployees() {
    await axios.get('/api/employees')
    .then( res => {
      this.setState({employees: res.data})
    })
  }

  async deleteUser(id) {
    await axios.delete(`/api/employees/${id}`)
    .then( response => {
      this.setState({employees: response.data})
    })
  }
  
  render(){
    console.log(this.props)
    // console.log(this.state.employees)
    let mapEmployees = this.state.employees.map(employee => {
      return(
          <EmployeeCard
            employeeId={employee.employee_id} 
            id={employee.id}
            key={employee.id}
            image={employee.image_url}
            name={employee.name}
            deleteUserFn={this.deleteUser}
          />
      )
    })
    // console.log(this.state.employees)
    // console.log(mapEmployees)
    return(
      <div>
        <NavLoggedIn
          // How do I make it so I can pass the props from employee map to Nav upon Login?
          // Redux State?
        />
        <Link to='/new'><button id='new-button'><img src='https://png.pngtree.com/svg/20141230/plus_line_circle_878677.png' height={40} alt='add-employee'/></button></Link>
          <div id='card-box'>
            {mapEmployees}
          </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const {employees} = state
  return employees;
} 

export default connect(mapStateToProps)(EmployerDashboard);