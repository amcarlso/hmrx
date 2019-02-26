import React from 'react';
import './Nav.css';
import logo from '../../images/logo.png';

export default function Nav(props) {
  return (
    <div id='nav-spacing'>
      <img src={logo} alt='HMRX logo' className='logo'/>
      <div className='user-options'>
        <div className='user-button' onClick={() => props.regTogFn()}>Register</div>
        <div className='user-button' onClick={() => props.logTogFn()}>Login</div>
      </div>
    </div>
  )
}