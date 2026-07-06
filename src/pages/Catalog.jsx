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

  const catalogNameplatesEX = catalog?.filter(nameplate =>
    ['EX','GX','SP'].some(option => nameplate.catalog_no.startsWith(option))
  );
  const catalogNameplatesRP = catalog?.filter(nameplate =>
    ['RP'].some(option => nameplate.catalog_no.startsWith(option))
  );
  const catalogNameplatesRG = catalog?.filter(nameplate =>
    ['RG'].some(option => nameplate.catalog_no.startsWith(option))
  );

  const isUserOwned = (nameplate_id) => {
    let output = false;
    for(let nameplate of user.nameplates) {
      if(nameplate.id === nameplate_id) {
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

  const openDialog = (nameplate, type) => {
    setModalContent(
      <div className={'card-details ' + type}>
        <img className='card-image' src={UserCard(nameplate.sysname + "-thumb")} alt={nameplate.name} />
        <h3 className="name">{nameplate.name}</h3>
        <div className="badges">
          {nameplate.is_pull === 0 && (
            <span className='card-badge oop'>Out of print</span>
          )}
          {nameplate.is_premium === 1 && (
            <span className="card-badge premium">Premium</span>
          )}
          {nameplate.is_event === 1 && (
            <span className="card-badge event">Event Exclusive</span>
          )}
          {nameplate.is_rare === 1 && (
            <span className="card-badge rare">Rare</span>
          )}
        </div>
        <table className="card-table-details">
          <tbody>
            <tr>
              <th>Catalog #</th>
              <td>{nameplate.catalog_no}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{nameplate.is_premium === 1 ? 'Premium ' : ''}{nameplate.name}</td>
            </tr>
            <tr>
              <th>Release</th>
              <td>{nameplate.release}</td>
            </tr>
            <tr>
              <th>Availability</th>
              <td>{ nameplate.is_pull === 1 ? nameplate.is_premium === 1 ? ('Yes, VIP/Subscribers only') : ('Yes') : ('No') }</td>
            </tr>
            { nameplate.notes !== null && (
            <tr>
              <th>Notes</th>
              <td>{ nameplate.notes }</td>
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
            <Tile extraClassName={'card-catalog'} icon={<i className="fa-solid fa-credit-card"></i>} title={'Member Nameplate Catalog'}>
              { isLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                <p className="instructions">Click on a nameplate design to show more details.</p>
                <h3 className='card-category specials'>Specials &amp; Exclusives</h3>
                <div className="catalog-list">
                  {catalogNameplatesEX.length > 0 && (
                    catalogNameplatesEX.map((item, idx) => (
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
                  {catalogNameplatesRP.length > 0 && (
                    catalogNameplatesRP.map((item, idx) => (
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
                  {catalogNameplatesRG.length > 0 && (
                    catalogNameplatesRG.map((item, idx) => (
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
                  <p className="q">What are Collectible Nameplates?</p>
                  <p className="a">
                    Collectible Nameplates are your virtual identity within <b>@the13thgeek</b>'s Twitch community.
                    <br />
                    Viewers redeem <b>"Check-in"</b> during the stream, which displays their nameplate on-screen along with their username,
                    user level, and total number of check-ins.
                    <br />
                    Nameplates come in various designs and are acquired through a gacha system.
                  </p>
                </li>

                <li>
                  <p className="q">How do I get my own nameplate?</p>
                  <p className="a">
                    All viewers are issued the Standard nameplate by default. Viewers can unlock new designs by redeeming{" "}
                    <b>"Mystery Nameplate Pull"</b> using channel points.
                  </p>
                </li>

                <li>
                  <p className="q">What are the differences between Standard and Premium nameplates?</p>
                  <p className="a">
                    VIPs and Subscribers have the opportunity to pull additional Premium nameplates. Standard nameplates are
                    available to all viewers.
                  </p>
                </li>

                <li>
                  <p className="q">What are Special and Exclusive nameplates?</p>
                  <p className="a">
                    Special and Exclusive nameplates are limited-time designs available during events or themed streams.
                    <br />
                    These may include seasonal drops, milestones, or game-specific events. Check the Discord for announcements!
                  </p>
                </li>

                <li>
                  <p className="q">
                    I pulled a Premium nameplate but I can’t renew my subscription. What happens to it?
                  </p>
                  <p className="a">
                    All nameplates you have already obtained are permanently yours! :)
                  </p>
                </li>

                <li>
                  <p className="q">I've collected a few nameplates. How do I choose which one is shown on stream?</p>
                  <p className="a">
                    There are two ways:
                    <br />
                    <b>(1)</b> In chat, type <b>!getnp</b> and follow the bot instructions to select your active nameplate.
                    <br />
                    <b>(2)</b> On the Mainframe website, go to your Profile page and click <b>Set Active</b> on your chosen nameplate.
                  </p>
                </li>

                <li>
                  <p className="q">Other than the Mainframe site and check-ins, what are nameplates for?</p>
                  <p className="a">
                    Nameplates are a way to represent your identity within <b>@the13thgeek</b>'s stream community. They provide
                    visual recognition as a personalized virtual membership ID.
                  </p>
                  <p className="a">
                    Planned features include displaying nameplates during raids and shoutouts (if the user has a nameplate in the system).
                  </p>
                </li>

                <li>
                  <p className="q">How do I know when new nameplates are available?</p>
                  <p className="a">
                    New nameplates are announced live on-stream and shared through Discord and social media.
                    <br />
                    Make sure to stay tuned so you don’t miss limited-time drops!
                  </p>
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