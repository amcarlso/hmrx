import React from 'react';
import './Nav.css';
import logo from '../../images/logo.png';

export default function Nav() {
  return (
    <div id='nav-spacing'>
      <img src={logo} alt='HMRX logo' height={60}/>
      <div>
         
        <div>
          <button className='button-styling'>Login</button>
          <button className='button-styling'>Register</button>
        </div>
      </div>
    </div>
  )
}