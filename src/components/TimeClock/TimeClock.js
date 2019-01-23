import React, {Component} from 'react';
import NavLoggedIn from '../NavLoggedIn/NavLoggedIn';
import './TimeClock.css'
import {Link} from 'react-router-dom';
import backButton from '../../images/back.png';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import TimePunch from '../TimePunch/TimePunch'

export default class TimeClock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      punches: [],
      userInfo: {},
      employeeInfo: {}
    }
    this.punchIn = this.punchIn.bind(this);
    this.punchOut = this.punchOut.bind(this);
    this.getPunches = this.getPunches.bind(this);
  }
  async componentDidMount() {
    try {
      const userData = await axios.get('/api/user-data');
      console.log(userData.data)
      if(userData.data) {
        await this.setState({userInfo: userData.data});
        await this.getEmployeeInfo();
      }
    } catch(error) {
      console.log(error)
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'You are not logged in. Please Log in.'
      });
      this.props.history.push('/');
    } 
  }

  getEmployeeInfo() {
    console.log(this.state)
    axios.get(`/api/employees/${this.props.match.params.employeeid}`)
    .then( res => {
      this.setState({employeeInfo: res.data})
      this.getPunches()
    })
  }

  punchIn() {
    let punchIn = moment().format("MM/DD/YYYY hh:mm A");
    axios.post('/api/punches', {punchIn: punchIn})
    .then( res => {
      this.setState({punches: res.data})
    })
  }

  punchOut() {
    let punchOut = moment().format("MM/DD/YYYY hh:mm A");
    axios.put(`/api/punches/${this.state.employeeInfo.id}`, {punchOut: punchOut})
    .then( res => {
      this.setState({punches: res.data})
    })
  }

  getPunches() {
    console.log(this.state)
    axios.get(`/api/punches/${this.state.employeeInfo.id}`)
    .then( res => {
      this.setState({punches: res.data})
    })
  }

  render(){
    console.log(this.state.punches)
    let mapPunches = this.state.punches.map( punch => {
      return(
        <TimePunch 
          key={punch.punch_id}
          id={punch.punch_id}
          punchIn={punch.punch_in}
          punchOut={punch.punch_out}
        />
      )
    })
    //let punchIn = moment().format("MM/DD/YYYY hh:mm A"); //format just determines how you will render the string
    console.log(this.state.punches)
    const {employeeInfo} = this.state;
    return(
      <div className='background-clock'>
        <NavLoggedIn />
        <div>
          <Link to={`/employee/${this.props.match.params.employeeid}`}><img src={backButton} alt='back' id='back-icon'/></Link>
        </div>
        <div id='clock-header'>
          <div>
            <button className='clock-buttons' onClick={() => this.punchIn()}>Clock In</button>
          </div>
          <div id='picture-title-styling'>
            <img src={employeeInfo.image_url} className='picture' alt={employeeInfo.name}/>
            <h1>{`${employeeInfo.name}'s Time Clock`}</h1>
          </div>
          <div>
            <button className='clock-buttons' onClick={() => this.punchOut()}>Clock Out</button>
          </div>
        </div>
        <div id='punches-container'>
          <div id='punches-title'>
            <span>Date</span>
            <span>In</span>
            <span>Out</span>
            <span>Hours</span>
          </div>
          <div id='punch-box'>
            {mapPunches}
          </div>
        </div>
      </div>
    )
  }
}