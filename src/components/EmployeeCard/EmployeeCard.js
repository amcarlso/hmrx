import React from 'react';
import './EmployeeCard.css'
import {Link} from 'react-router-dom';

export default function EmployeeCard(props) {
  return(
      <div id='card-container'>
        <div>
          <button onClick={() => props.deleteUserFn(props.employeeId)} id='delete-style'>X</button>
        </div>
        <Link className='link-style' to={`/employee/${props.employeeId}`}>
        <div id='card-content-style'>
        
          <img id='image-style' src={props.image} alt={props.name} />
        
          <p id='name-style'>{props.name}</p>
        </div>
        </Link>
      </div>
    
  )
}