import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import './CheckoutForm.css'
import axios from 'axios';

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
    console.log(response)
    console.log(this.props)
    if (response.ok) console.log("Purchase Complete!")
    if (response.ok) await axios.put(`api/user-data/${this.props.userData.id}`)
  }

  render() {
    const {userData} = this.props;
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div className={userData.paid === 'yes' ? "checkout-paid" : "checkout"}>
      <div>
        <p className='description'>Would you like to complete the purchase?</p>
        <p className='description'>Your card will be charged $2.00</p>
      </div>
        <CardElement id='card-info'/>
        <button id='send-button' onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);