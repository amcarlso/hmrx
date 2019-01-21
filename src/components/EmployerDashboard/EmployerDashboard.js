import React, {Component} from 'react';
import NavLoggedIn from '../NavLoggedIn/NavLoggedIn';
import axios from 'axios';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import './EmployerDashboard.css'
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import Swal from 'sweetalert2';

export default class EmployerDashboard extends Component {
  constructor(props){
    super(props);

    this.state = {
      userData: {},
      employees: []
    }
    
    this.deleteUser = this.deleteUser.bind(this);
  }

  async componentDidMount() {
    try {
      const userData = await axios.get('/api/user-data')
      
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
    console.log(userData)
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
        <div className='add-pay'>
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
              src='https://png.pngtree.com/svg/20141230/plus_line_circle_878677.png' 
              height={40} 
              alt='add-employee'
            />
          </button>
          <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
            <div className="example">
              <Elements>
                <CheckoutForm userData={userData}/>
              </Elements>
            </div>
          </StripeProvider>
        </div>
        
        <div id='card-box'>{mapEmployees}</div>
      </div>
    )
  }
}
