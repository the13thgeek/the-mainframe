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
          setCatalog(result.catalog);
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

  const openDialog = (card) => {
    setModalContent(
      <div className="card-details">
        <div className="card-thumbnail">
          <img src={UserCard(card.sysname + "-thumb")} alt={card.name} />
          <h3 className="name">{card.name}</h3>
          <div className="badges">
            {card.is_active === 0 && card.is_pull === 0 && (
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
        </div>
        <div className="card-info">
          <p className='acquisition'>
            <b>Catalog #</b> {card.catalog_no}<br />
            <b>Released: </b> {card.release}<br />
            <b>Pull Availability:</b> { card.is_active === 1 ? card.is_premium === 1 ? ('Yes, VIP/Subscribers only') : ('Yes') : ('No') }
            {card.notes !== "null" && (<><br /><b>Notes:</b></>)}
          </p>
          { card.notes !== "null" && (
            <p className="notes">{card.notes}</p>
          )}
        </div>
      </div>
    );
    setModalOpen(true);
  };

  const closeDialog = () => {
    setModalOpen(false);
  };

  if (!user) return null;

  return (
    <div className="layout-row">
      <div className="col-a">
        <Tile extraClassName={'card-catalog'} icon={<i className="fa-solid fa-credit-card"></i>} title={'Member Card Catalog'}>
          { isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
            <p className="instructions">Click on a card design to show more details.</p>
            <h3 className='card-category'>Specials &amp; Exclusives</h3>
            <div className="catalog-list">
              {catalogCardsEX.length > 0 && (
                catalogCardsEX.map((item, idx) => (
                  <div className='catalog-item' key={idx} onClick={() => openDialog(item)}>
                    <img src={UserCard(item.sysname + "-thumb")} alt={item.name} />
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
            <h3 className='card-category'>Premium Issue</h3>
            <div className="catalog-list">
              {catalogCardsRP.length > 0 && (
                catalogCardsRP.map((item, idx) => (
                  <div className='catalog-item' key={idx} onClick={() => openDialog(item)}>
                    <img src={UserCard(item.sysname + "-thumb")} alt={item.name} />
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
            <h3 className='card-category'>Standard Issue</h3>
            <div className="catalog-list">
              {catalogCardsRG.length > 0 && (
                catalogCardsRG.map((item, idx) => (
                  <div className='catalog-item' key={idx} onClick={() => openDialog(item)}>
                    <img src={UserCard(item.sysname + "-thumb")} alt={item.name} />
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
      <Modal isOpen={isModalOpen} onClose={() => closeDialog()} footer={<button onClick={closeDialog}>Close</button>}>
        {modalContent}
      </Modal>
    </div>
  )
}

export default Catalog