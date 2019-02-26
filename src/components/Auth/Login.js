import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    document.getElementById('username-input').focus();
  }

  render() {
    return (
      <div className='modal'>
        <div className='option-container'>
          <p id='sign-in'>Sign In</p>
          <input id='username-input' onKeyDown={(e) => this.props.keyDownLog(e)} placeholder='username' onChange={(e) => this.props.handleInput('loginUsername', e)} />
          <br/>
          <input onKeyDown={(e) => this.props.keyDownLog(e)} placeholder='password' onChange={(e) => this.props.handleInput('loginPassword', e)} type='password' />
          <br/>
          <div className='button-spacing'>
            <button className='button-styling' onClick={() => this.props.logTogFn()}>Cancel</button>
            <button className='button-styling' onClick={() => this.props.logFn()}>Enter</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);