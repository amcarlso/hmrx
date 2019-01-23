import React from 'react';
import './TimePunch.css'
import moment from 'moment';

export default function TimePunch(props) {
  console.log(props.punchIn)
  let punchInMoment = moment(props.punchIn, "MM/DD/YYYY hh:mm A");
  let punchOutMoment = moment(props.punchOut, "MM/DD/YYYY hh:mm A");
  let duration = parseFloat(Math.round(punchOutMoment.diff(punchInMoment, "minutes")) / 60).toFixed(3);
  console.log(duration)
  // var duration = moment.duration(props.punchOut.diff(props.punchIn))
  return(
    <div>
      <div className='punch-style'>
        <div>{moment(props.punchIn, "MM/DD/YYYY hh:mm A").format("M/D/YYYY")}</div>
        <div>{moment(props.punchIn, "MM/DD/YYYY hh:mm A").format("h:mm A")}</div>
        {/* <div>{props.punchIn.format("hh:mm A")}</div> */}
        <div>{moment(props.punchOut, "MM/DD/YYYY hh:mm A").format("h:mm A") !== 'Invalid date' ? moment(props.punchOut, "MM/DD/YYYY hh:mm A").format("h:mm A") : null}</div>
        <div>{isNaN(duration) ? null : duration}</div>
      </div>
      <hr/>
    </div>
    
  )
}