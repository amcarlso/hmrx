import React from 'react';
import './Nav.css';

export default function Nav() {
  return (
    <div id='nav-spacing'>
      <span>HMRX</span>
      <div>
        {<p>loggedIn</p> ? <span>Welcome: user</span> : null}
        
      </div>
    </div>
  )
}