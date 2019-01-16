import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import {Link} from 'react-router-dom';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import './EmployerDashboard.css'

export default class EmployerDashboard extends Component {
  constructor(props){
    super(props)

    this.state = {
      employees: []
    }
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
  
  render(){
    let mapEmployees = this.state.employees.map(employee => {
      return(
          <EmployeeCard 
            key={employee.id}
            image={employee.image_url}
            name={employee.name}
          />
      )
    })
    console.log(this.state)
    return(
      <div>
        {(this.props.location.pathname !== '/') ? <Nav /> : null}
        EmployerDashboard
        <Link to='/'>
          <div id='card-box'>
            {mapEmployees}
          </div>
        </Link>
        
        <Link to='/new'><button><img src='https://png.pngtree.com/svg/20141230/plus_line_circle_878677.png' height={40} alt='add-employee'/></button></Link>
      </div>
    )
  }
}