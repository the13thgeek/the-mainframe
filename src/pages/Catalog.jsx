import React, { useState, useEffect } from 'react';
import './Catalog.scss';
import Tile from '../components/Tile';
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { getUserFromStorage } from "../utils/auth";
import { UserCard } from "../utils/common";

const Catalog = () => {
  const navigate = useNavigate();
  const user = getUserFromStorage();
  const [catalog, setCatalog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const catalogCardsEX = catalog?.filter(card =>
    ['EX','GX','SP'].some(option => card.catalog_no.startsWith(option))
  );
  const catalogCardsRP = catalog?.filter(card =>
    ['RP'].some(option => card.catalog_no.startsWith(option))
  );
  const catalogCardsRG = catalog?.filter(card =>
    ['RG'].some(option => card.catalog_no.startsWith(option))
  );

  const isUserOwned = (card_id) => {
    let output = false;
    for(let card of user.user_cards) {
      if(card.id === card_id) {
        output = true;
        break;
      }
    }
    return output;
  }
  
  useEffect(() => {
    const fetchCatalog = async()  => {  
      try {
        const response = await fetch(`${import.meta.env.VITE_CLOUD_URL}/mainframe/catalog`,
          {
            method: 'POST',
            headers: {
              "x-api-key": import.meta.env.VITE_CLOUD_APIKEY,
              "Content-Type": "application/json"
            }
          });
        if(response) {
          const result = await response.json();
          setCatalog(result.data.catalog);
          setIsLoading(false);
        }
      } catch(e) {
        setIsLoading(false);
        console.log('[Catalog] Error: ' + e.message);
      }
    };

    fetchCatalog();

  },[]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const openDialog = (card, type) => {
    setModalContent(
      <div className={'card-details ' + type}>
        <img className='card-image' src={UserCard(card.sysname + "-thumb")} alt={card.name} />
        <h3 className="name">{card.name}</h3>
        <div className="badges">
          {card.is_pull === 0 && (
            <span className='card-badge oop'>Out of print</span>
          )}
          {card.is_premium === 1 && (
            <span className="card-badge premium">Premium</span>
          )}
          {card.is_event === 1 && (
            <span className="card-badge event">Event Exclusive</span>
          )}
          {card.is_rare === 1 && (
            <span className="card-badge rare">Rare</span>
          )}
        </div>
        <table className="card-table-details">
          <tbody>
            <tr>
              <th>Catalog #</th>
              <td>{card.catalog_no}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{card.is_premium === 1 ? 'Premium ' : ''}{card.name}</td>
            </tr>
            <tr>
              <th>Release</th>
              <td>{card.release}</td>
            </tr>
            <tr>
              <th>Availability</th>
              <td>{ card.is_pull === 1 ? card.is_premium === 1 ? ('Yes, VIP/Subscribers only') : ('Yes') : ('No') }</td>
            </tr>
            { card.notes !== null && (
            <tr>
              <th>Notes</th>
              <td>{ card.notes }</td>
            </tr>
            ) }
          </tbody>
        </table>
      </div>
    );
    setModalOpen(true);
  };

  const closeDialog = () => {
    setModalOpen(false);
  };

  if (!user) return null;

  return (
    <main className="page-catalog">
      <div className="structure">
        <div className="row">
          <div className="col-a">
            <Tile extraClassName={'card-catalog'} icon={<i className="fa-solid fa-credit-card"></i>} title={'Member Card Catalog'}>
              { isLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                <p className="instructions">Click on a card design to show more details.</p>
                <h3 className='card-category specials'>Specials &amp; Exclusives</h3>
                <div className="catalog-list">
                  {catalogCardsEX.length > 0 && (
                    catalogCardsEX.map((item, idx) => (
                      <div className='catalog-item' key={idx} onClick={() => openDialog(item, 'ex')}>
                        <div className="card-image">
                          <img src={UserCard(item.sysname + "-thumb")} alt={item.name} />
                          <p className="card-name">{item.name}</p>
                        </div>
                        <div className="indicators">
                          { isUserOwned(item.id) && (
                          <div className="indicator collect"><i className="fa-solid fa-circle-check"></i> Collected</div>
                          )}
                          { item.is_new === 1 && (
                          <div className="indicator new">New!</div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <h3 className='card-category premium'>Premium Issue</h3>
                <div className="catalog-list">
                  {catalogCardsRP.length > 0 && (
                    catalogCardsRP.map((item, idx) => (
                      <div className='catalog-item' key={idx} onClick={() => openDialog(item, 'rp')}>
                        <div className="card-image">
                          <img src={UserCard(item.sysname + "-thumb")} alt={item.name} />
                          <p className="card-name">{item.name}</p>
                        </div>
                        <div className="indicators">
                          { isUserOwned(item.id) && (
                          <div className="indicator collect"><i className="fa-solid fa-circle-check"></i> Collected</div>
                          )}
                          { item.is_new === 1 && (
                          <div className="indicator new">New!</div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <h3 className='card-category standard'>Standard Issue</h3>
                <div className="catalog-list">
                  {catalogCardsRG.length > 0 && (
                    catalogCardsRG.map((item, idx) => (
                      <div className='catalog-item' key={idx} onClick={() => openDialog(item, 'rg')}>
                        <div className="card-image">
                          <img src={UserCard(item.sysname + "-thumb")} alt={item.name} />
                          <p className="card-name">{item.name}</p>
                        </div>
                        <div className="indicators">
                          { isUserOwned(item.id) && (
                          <div className="indicator collect"><i className="fa-solid fa-circle-check"></i> Collected</div>
                          )}
                          { item.is_new === 1 && (
                          <div className="indicator new">New!</div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                </>
              )}
              
            </Tile>
          </div>
          <div className="col-b">
            <Tile extraClassName={'card-faq'} icon={<i className="fa-solid fa-circle-question"></i>} title={'Member Card FAQs'}>
              <ul className="faq">
                <li>
                  <p className='q'>What are Collectible Member Cards?</p>
                  <p className='a'>The Collectible Member Cards are issued to every Twitch viewer as their form of virtual ID. Viewers redeem "Check-in" during <b>@the13thgeek</b>'s stream and it shows the viewer's card on the screen with their name on it, together with their user level and number of total check-ins.<br />
                  These cards comes in various designs and are acquired through a gacha mechanic.</p>
                </li>
                <li>
                  <p className="q">How do I get my own membership card?</p>
                  <p className="a">All viewers are issued the regular blue one by default. Viewers can get new designs by redeeming <b>"Mystery Card Pull"</b> using their channel points.</p>
                </li>
                <li>
                  <p className="q">What are the differences between Standard and Premium designs?</p>
                  <p className="a">The channel's <b>VIP and Subscribers</b> have the opportunity to pull additional designs (Premium). The Standard designs are available for everyone.</p>
                </li>
                <li>
                  <p className="q">What are the Special and Exclusive designs?</p>
                  <p className="a">There are additional fun card designs that are only available during an event or when streaming specific games! Check out our Discord channel for card drop announcements!</p>
                </li>
                <li>
                  <p className="q">I pulled and collected a Premium card but I can't renew my subscription. What happens to the card?</p>
                  <p className="a">Users will retain ownership of any previously-obtained card designs! :)</p>
                </li>
                <li>
                  <p className="q">I've collected a few designs. How do I pick which one I want to use for the stream?</p>
                  <p className="a">There are two ways: <b>(1) on the stream chat, type !getcards</b> and the chatbot will respond do you with a list of card names that you own. Follow the instructions provided; and <b>(2) on the Mainframe site, open your Profile page</b> and click on <b>Set Active</b> on your chosen design.</p>
                </li>
                <li>
                  <p className="q">Other than the Mainframe site and the check-ins, what else are the cards for?</p>
                  <p className="a">These cards are a perk of every viewer on <b>@the13thgeek</b>'s stream! It gives everyone recognition in the form of a unique virtual membership ID that is tailored for them.</p>
                  <p className="a">Additional planned features are to incorporate these cards on raids and shoutouts (if the person raiding in or receiving a shoutout has a membership card in the system)!</p>
                </li>
                <li>
                  <p className="q">How would I know if there are any new designs?</p>
                  <p className="a">Announcements will be made live on-stream and on social media and Discord. Make sure you follow and stay tuned!</p>
                </li>
              </ul>
            </Tile>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => closeDialog()} footer={<button onClick={closeDialog}>Close</button>}>
        {modalContent}
      </Modal>
    </main>
    
    // <div className="layout-row">      
    //   <div className="col-b">
    //   </div>
    // </div>
  )
}

export default Catalog