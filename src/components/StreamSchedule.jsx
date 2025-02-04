import React, { useState, useEffect } from 'react';
import './StreamSchedule.scss';

const StreamSchedule = () => {
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(`/data/schedule.json`);
      if(!response.ok) {
        throw new Error(response.status);
      } else {
        const sked = await response.json();
        setSchedule(sked);
      }
    }
    //fetchSchedule();
  },[]);


  if(!schedule || schedule?.length === 0) return (<p>Stream schedule is not available at this time.</p>)

  return (
    schedule.map((scheduleItem, idx) => (
      <div key={idx} className="schedule-item">
        <div className="day-time">
          <b>[{scheduleItem.day}] {scheduleItem.date}</b><br />
          <small>{scheduleItem.time}</small>
        </div>
        <div className="program">
          <b>{scheduleItem.title}</b><br />
          {scheduleItem.game}
        </div>
      </div>  
    ))
  )
}

export default StreamSchedule