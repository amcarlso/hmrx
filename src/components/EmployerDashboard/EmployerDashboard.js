import React, {Component} from 'react';
import NavLoggedIn from '../NavLoggedIn/NavLoggedIn';
import axios from 'axios';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import './EmployerDashboard.css'
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import Swal from 'sweetalert2';
import add from '../../images/add.png';

export default class EmployerDashboard extends Component {
  constructor(props){
    super(props);

    this.state = {
      userData: {},
      employees: []
    }
    
    this.deleteUser = this.deleteUser.bind(this);
    this.getUserData = this.getUserData.bind(this);
  }

  async componentDidMount() {
      this.getUserData();
  }

  async getUserData() {
    try {
    const userData = await axios.get('/api/user-data');
    if(userData.data) {

      this.setState({userData: userData.data})
      await this.getEmployees();
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
    const {userData} = this.state;    
    console.log(this.props)
    let mapEmployees = this.state.employees.map(employee => {
      return(
          <EmployeeCard
            employeeId={employee.employee_id} 
            id={employee.id}
            key={employee.id}
            image={employee.image_url}
            name={employee.name}
            position={employee.position}
            deleteUserFn={this.deleteUser}
          />
      )
    })
    return(
      <div className='background'>
        <NavLoggedIn/>
        <div className='content-display'>
          <div className='add-pay'>
            <div id='employees-title-container'>
              <span id='employees-title'>Employees</span>
              <button 
                onClick={
                  () => {
                    userData.paid === 'yes' ? 
                    this.props.history.push('/new') : 
                    Swal.fire({
                      type: 'error',
                      title: 'Oops...',
                      text: 'You must pay before using this feature.'
                    })
                  }
                }
                id='new-button'
              >
                <img 
                  src={add} 
                  id='add-button' 
                  alt='add-employee'
                />              
              </button>
            </div>
            
            <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
              <div className="example">
                <Elements>
                  <CheckoutForm 
                    userData={userData}
                    getUserDataFn={this.getUserData}
                  />
                </Elements>
              </div>
            </StripeProvider>
          </div>
          <div id='card-box'>{mapEmployees}</div>
        </div>
        
      </div>
    )
  }
}
