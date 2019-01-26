import React from 'react';
import './TimePunch.css'
import moment from 'moment';

export default function TimePunch(props) {
  let punchInMoment = moment(props.punchIn, "MM/DD/YYYY hh:mm A");
  let punchOutMoment = moment(props.punchOut, "MM/DD/YYYY hh:mm A");
  let duration = parseFloat(Math.round(punchOutMoment.diff(punchInMoment, "minutes")) / 60).toFixed(3);
  return(
    <div>
      <div className='punch-style'>
        <div>{moment(props.punchIn, "MM/DD/YYYY hh:mm A").format("M/D/YYYY")}</div>
        <div>{moment(props.punchIn, "MM/DD/YYYY hh:mm A").format("h:mm A")}</div>
        <div>{moment(props.punchOut, "MM/DD/YYYY hh:mm A").format("h:mm A") !== 'Invalid date' ? moment(props.punchOut, "MM/DD/YYYY hh:mm A").format("h:mm A") : null}</div>
        <div>{isNaN(duration) ? null : duration}</div>
      </div>
      <hr/>
    </div>
    
  )
}