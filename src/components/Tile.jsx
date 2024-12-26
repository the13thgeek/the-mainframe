import React from 'react';
import './Tile.scss';

const Tile = ({ extraClassName, icon = null, title = null, children }) => {
  return (
    <div className={'tile ' + extraClassName}>
      {(icon !== null && title !== null) && (
        <div className="widget-title">
          {icon} <h3>{title}</h3>
        </div>
      )}
      <div className="widget-body">
        {children}
      </div>      
    </div>
  )
}

export default Tile