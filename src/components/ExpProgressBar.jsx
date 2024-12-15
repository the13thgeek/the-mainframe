import React from 'react';
import './ExpProgressBar.scss';

const ExpProgressBar = ({ level = null, progress = null }) => {
  if( level === null || progress === null ) return null;

  return (
    <div className='exp-progress-bar'>
      <div className={'shader user-level-bg level-'+level} style={{ width: progress + '%' }}></div>
    </div>
  )
}

export default ExpProgressBar