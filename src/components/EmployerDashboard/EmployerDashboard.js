import React, {Component} from 'react';
import NavLoggedIn from '../NavLoggedIn/NavLoggedIn';
import axios from 'axios';
import {Link} from 'react-router-dom';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import './EmployerDashboard.css'
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
// import {connect} from 'react-redux';

export default class EmployerDashboard extends Component {
  constructor(props){
    super(props)

    this.state = {
      employees: []
    }
    
    this.deleteUser = this.deleteUser.bind(this);
  }

  async componentDidMount() {
    try {
      const userData = await axios.get('/api/user-data')
      if(userData.data) {
        this.getEmployees()
      }
    } catch(error) {
      console.log(error)
      alert("Please sign in...")
      this.props.history.push('/')
    }
  }

  async getEmployees() {
    const response = await axios.get('/api/employees')
    this.setState({employees: response.data})
  }

  async deleteUser(id) {
    const response = await axios.delete(`/api/employees/${id}`)
      this.setState({employees: response.data})
  }
  
  render(){
    console.log(this.props)
    // console.log(userData.data)
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
        <NavLoggedIn/>
        <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
        <div className="example">
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
        <Link to='/new'><button id='new-button'><img src='https://png.pngtree.com/svg/20141230/plus_line_circle_878677.png' height={40} alt='add-employee'/></button></Link>
        <div id='card-box'>{mapEmployees}</div>
      </div>
    )
  }
}
// function mapStateToProps(state) {
//   const {employees} = state
//   return employees;
// } 

// export default connect(mapStateToProps)(EmployerDashboard);