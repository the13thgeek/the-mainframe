import React, { useState, useEffect } from 'react';
import { UserCard } from '../utils/common';
import './GachaCardList.scss';

const GachaCardList = () => {
  const [availableCards, setAvailableCards] = useState(null);

  const cardsEX = availableCards?.filter(card =>
    ['EX','GX','SP'].some(option => card.catalog_no.startsWith(option))
  );
  const cardsRP = availableCards?.filter(card =>
    ['RP'].some(option => card.catalog_no.startsWith(option))
  );
  const cardsRG = availableCards?.filter(card =>
    ['RG'].some(option => card.catalog_no.startsWith(option))
  );

  useEffect(() => {
      const fetchAvailableCards = async()  => {  
        try {
          const response = await fetch(`${import.meta.env.VITE_CLOUD_URL}/mainframe/get-available-cards`,
            {
              method: 'POST',
              headers: {
                "x-api-key": import.meta.env.VITE_CLOUD_APIKEY,
                "Content-Type": "application/json"
              }
            });
          if(response) {
            const result = await response.json();
            setAvailableCards(result.list);
          }
        } catch(e) {
          console.log('[Available Cards] Error: ' + e.message);
        }
      };
  
      fetchAvailableCards();
  
    },[]);

  if(!availableCards || availableCards.length === 0) return (<p>No cards are available for this stream.</p>);

  return (
    <>
    <p className='gacha-info'>These user card designs can be obtained on this stream.</p>
    {/* Specials & Exclusives */}
    {cardsEX.length > 0 && (
      <>
      <div className="gacha-section-heading specials">
        <h3 className="card-category">Specials & Exclusives</h3>
        <small>Available to VIPs / Twitch Subscribers</small>
      </div>
      <div className='gacha-list'>
        {cardsEX.map((cardItem,idx) => (
          <div className={'item' + (cardItem.is_new ? ' new' : '')} key={idx}>
            <img src={UserCard(cardItem.sysname + '-thumb')} alt={`Card: ${cardItem.name}`} />
            <p>{ cardItem.name }</p>
          </div>
        ))}
      </div>
      </>
    )}
    {/* Premium Issue */}
    {cardsRP.length > 0 && (
      <>
      <div className="gacha-section-heading premium">
        <h3 className="card-category">Premium Issue</h3>
        <small>Available to VIPs / Twitch Subscribers</small>
      </div>
      <div className='gacha-list'>
        {cardsRP.map((cardItem,idx) => (
          <div className={'item' + (cardItem.is_new ? ' new' : '')} key={idx}>
            <img src={UserCard(cardItem.sysname + '-thumb')} alt={`Card: ${cardItem.name}`} />
            <p>{ cardItem.name }</p>
          </div>
        ))}
      </div>
      </>
    )}
    {/* Standard Issue */}
    {cardsRG.length > 0 && (
      <>
      <div className="gacha-section-heading standard">
        <h3 className="card-category">Standard Issue</h3>
        <small>Available to all viewers</small>
      </div>
      <div className='gacha-list'>
        {cardsRG.map((cardItem,idx) => (
          <div className={'item' + (cardItem.is_new ? ' new' : '')} key={idx}>
            <img src={UserCard(cardItem.sysname + '-thumb')} alt={`Card: ${cardItem.name}`} />
            <p>{ cardItem.name }</p>
          </div>
        ))}
      </div>
      </>
    )}
    </>
  )
}

export default GachaCardList