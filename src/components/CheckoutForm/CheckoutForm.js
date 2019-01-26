import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import './CheckoutForm.css'
import axios from 'axios';
import Swal from 'sweetalert2';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let response = await fetch("/charge", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id
    });
    if (response.ok) {Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Payment Successful',
      showConfirmButton: false,
      timer: 1200
    })} else {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Payment not completed. Please try again.'
      })
    }
    if (response.ok){
      await axios.put(`api/user-data/${this.props.userData.id}`);
      this.props.getUserDataFn();
    }
  }

  render() {
    const {userData} = this.props;
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div className={userData.paid === 'yes' ? "checkout-paid" : "checkout"}>
      <div>
        <p className='description'>Please pay to start your HMRX experience</p>
        <p className='description'>Your card will be charged $20.00</p>
      </div>
        <CardElement id='card-info'/>
        <p className='description'>After Payment, adding employees will be enabled</p>
        <button id='pay-button' onClick={this.submit}>Confirm</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);