import React from 'react';
import './Tile.scss';

const Tile = ({ extraClassName, icon = null, title = null, children }) => {
  return (
    <div className={'tile ' + extraClassName}>
      {(title !== null) && (
        <div className="widget-title">
          <h3>{title}</h3>
        </div>
      )}
      <div className="widget-body">
        {children}
      </div>      
    </div>
  )
}

export default Tile