import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className='modal'>
        <div className='option-container'>
          <p id='register'>Register</p>
          <input onKeyDown={(e) => this.props.keyDownReg(e)} placeholder='name' onChange={(e) => this.props.handleInput('regName', e)} />
          <br/>
          <input onKeyDown={(e) => this.props.keyDownReg(e)} placeholder='username' onChange={(e) => this.props.handleInput('regUsername', e)} />
          <br/>
          <input onKeyDown={(e) => this.props.keyDownReg(e)} placeholder='password' onChange={(e) => this.props.handleInput('regPassword', e)} type='password' />
          <br/>
          <input onKeyDown={(e) => this.props.keyDownReg(e)} placeholder='phone ##########' onChange={(e) => this.props.handleInput('regPhone', e)} />
          <br/>
          <input onKeyDown={(e) => this.props.keyDownReg(e)} placeholder='email@email.com' onChange={(e) => this.props.handleInput('regEmail', e)} />
          <div>
            <button className='button-styling' onClick={() => this.props.regTogFn()}>Cancel</button>
            <button className='button-styling' onClick={() => this.props.regFn()}>Enter</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Register);
