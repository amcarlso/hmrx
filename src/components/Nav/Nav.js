import React from 'react';
import './Nav.css';
import logo from '../../images/logo.png';

export default function Nav() {
  return (
    <div id='nav-spacing'>
      <img src={logo} alt='HMRX logo' className='logo'/>
    </div>
  )
}