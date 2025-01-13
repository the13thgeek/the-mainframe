import React from 'react';
import { UserCard } from '../utils/common';
import './UserCardPreview.scss';

const UserCardPreview = ({ cardName = null, cardTitle = null, isPremium = false, isRare = false, isEvent = false, userLevel = null }) => {
  if(userLevel === null) {
    userLevel = 1
  }
  if(cardName && cardTitle) {
    return (
      <>
      <div className={'card-preview user-level-bg level-'+userLevel}>
        <img src={UserCard(cardName)} alt={`Card: ${cardTitle}`} />
      </div>
      <p className="card-name">
        {cardTitle} 
      </p>
      <p className="badges">
        { isPremium ? (<span className="card-badge premium">Premium</span>) : "" }
        { isEvent ? (<span className="card-badge event">Event Exclusive</span>) : "" }
        { isRare ? (<span className="card-badge rare">Rare</span>) : "" }
      </p>
      </>
    )
  } else {
    return (
      <div>No card data available.</div>
    )
  }
  
}

export default UserCardPreview