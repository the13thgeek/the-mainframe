import React from 'react';
import './UserCardPreview.scss';

const UserCardPreview = ({ cardName = null, cardTitle = null, isPremium = false}) => {

  const UserCard = (cardName) => {
    const imageURL = `/assets/cards/${cardName}.png`;

    return imageURL;
  }

  if(cardName && cardTitle) {
    return (
      <div className='card-preview'>
        <img src={UserCard(cardName)} alt={`Card: ${cardTitle}`} />
        <p className="card-name">
          {cardTitle} { isPremium ? (<span className="badge-prem">Premium</span>) : "" }</p>
      </div>
    )
  } else {
    return (
      <div>No card data available.</div>
    )
  }
  
}

export default UserCardPreview