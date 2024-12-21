import React from 'react';
import './GlobalNotice.scss';

const GlobalNotice = ({ icon = null, type = null, message = null }) => {
  if(!icon || !message || !type) return null;
  return (
    <>
    <div className="icon">
      {icon}
    </div>
    <div className="information">
      <h4>{type}</h4>
      <p className="message">{message}</p>
    </div>
    </>
    
  )
}

export default GlobalNotice