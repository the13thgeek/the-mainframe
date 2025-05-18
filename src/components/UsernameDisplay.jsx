import React from 'react';
import './UsernameDisplay.scss';
import { truncateText } from '../utils/common';

const UsernameDisplay = ({ userName, subMonths = 0 }) => {
  let userType = "Basic";

  if(subMonths >= 36) {
    userType = "Ascendant";
  } else if(subMonths >= 24) {
    userType = "Prime";
  } else if(subMonths >= 18) {
    userType = "Cipher";
  } else if(subMonths >= 12) {
    userType = "Striker";
  } else if(subMonths >= 6) {
    userType = "Acolyte";
  } 
  
  return (
    <div className='username-wrapper'>
      <span className={'username ' + userType.toLowerCase()}>{truncateText(userName,14)}</span>
    </div>
  )
}

export default UsernameDisplay