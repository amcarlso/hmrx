import React from 'react';
import './EmployeeCard.css'

export default function EmployeeCard(props) {
  return(
    
      <div id='card-container'>
        <div>
          <button>Delete</button>
        </div>
        <img id='image-style' src={props.image} alt={props.name} />
        <p id='name-style'>{props.name}</p>
      </div>
    
    
  )
}