import React from 'react';
import './EmployeeCard.css'
import {Link} from 'react-router-dom';

export default function EmployeeCard(props) {
  return(
    <div id='card-container'>
      <div>
        <button onClick={() => props.deleteUserFn(props.employeeId)} id='delete-style'>X</button>
      </div>
      <div id='card-content-style'>
      <Link to={`/employee/${props.employeeId}`}>
        <img id='image-style' src={props.image} alt={props.name} />
      </Link>
        <p id='name-style'>{props.name}</p>
      </div>
    </div>
  )
}