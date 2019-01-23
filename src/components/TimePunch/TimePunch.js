import React from 'react';
import './TimePunch.css'

export default function TimePunch(props) {
  console.log(props.punchIn)
  return(
    <div className='punch-style'>
      <div>{props.punchIn}</div>
      {/* <div>{props.punchIn.format("hh:mm A")}</div> */}
      <div>{props.punchOut}</div>
      <div></div>
    </div>
  )
}