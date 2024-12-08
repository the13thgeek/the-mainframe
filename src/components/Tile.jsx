import React from 'react';
import './Tile.scss';

const Tile = ({ extraClassName, children }) => {
  return (
    <div className={'tile ' + extraClassName}>
      {children}
    </div>
  )
}

export default Tile