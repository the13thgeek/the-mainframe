import React from 'react';
import { UserCard } from '../utils/common';
import './UserCardPreview.scss';

const UserCardPreview = ({ cardName = null, cardTitle = null, isPremium = false, isRare = false}) => {
  
  if(cardName && cardTitle) {
    return (
      <div className='card-preview'>
        <img src={UserCard(cardName)} alt={`Card: ${cardTitle}`} />
        <p className="card-name">
          {cardTitle} 
          { isPremium ? (<span className="card-badge premium">Premium</span>) : "" }
          { isRare ? (<span className="card-badge rare">Rare</span>) : "" }
        </p>
      </div>
    )
  } else {
    return (
      <div>No card data available.</div>
    )
  }
  
}

export default UserCardPreview