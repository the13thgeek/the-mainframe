import React, { useEffect, useState } from "react";
import { TWITCH_ACCESS_TOKEN, TWITCH_EXT_CLIENT_ID, thumbnailResize } from '../utils/twitch';
import { getUserFromStorage } from "../utils/auth";
import TwitchUserInfo from "../components/TwitchUserInfo";
import Tile from "../components/Tile";
import LiveStream from "../components/LiveStream";
import UserCardPreview from "../components/UserCardPreview";
import RequestsBar from "../components/RequestsBar";
import Ranking from "../components/Ranking";
import './Home.scss';

const Home = () => {
	const user = getUserFromStorage();
  const [liveData, setLiveData] = useState(null);
  
  useEffect(() => {    

    const fetchLiveData = async () => {
      // Fetch live data
      const liveResponse = await fetch(`https://api.twitch.tv/helix/streams?user_login=the13thgeek`, {
        headers: {
            'Authorization': `Bearer ${TWITCH_ACCESS_TOKEN}`,
            'Client-Id': `${TWITCH_EXT_CLIENT_ID}`
        },
      });
      const data = await liveResponse.json();
      const liveDataFeed = data.data[0];
      if(liveDataFeed) {
        liveDataFeed.thumbnail_url = thumbnailResize(liveDataFeed.thumbnail_url,1280,720);
      }
      setLiveData(liveDataFeed);
    }

    if(user) {
      fetchLiveData();
    }
  },[]);

	return (
    <>    
		<div className="layout-row">
      <div className="col-a">
        <div className="sub-row">
          <Tile extraClassName={'profile'}>
            <TwitchUserInfo />
            {/* {user && (
              <pre>
                {JSON.stringify(user, null, 2)}
              </pre>
            )} */}
          </Tile>        
          {user && (
            <Tile extraClassName={'live-stream'} icon={<i className="fa-solid fa-tv"></i>} title={'Live Stream'}>
              <LiveStream liveData={liveData} />
              {(liveData?.game_name === 'StepMania') && (
                <RequestsBar />
              )}
            </Tile>
          )}
          {!user && (
            <Tile extraClassName={'welcome'}>
              <h1>Welcome to <span className="hilite">@the13thgeek</span>'s Mainframe Hub!</h1>
              <p>Log in to the Hub with your Twitch account to:</p>
              <ul className="perks">
                <li>
                  <div className="icon"><i className="item-1 fa-solid fa-user-plus"></i></div>
                  <p className="details">
                    <b className='headline'>Track Your Profile Stats</b><br ></br>
                    Earn EXP by watching <b>@the13thgeek's</b> streams, participating in chat and redeeming channel point rewards. See how you rank with your fellow geeks and level up!
                  </p> 
                </li>
                <li>
                  <div className="icon"><i className="item-2 fa-solid fa-address-card"></i></div>
                  <p className="details">
                    <b className='headline'>Manage Your Frequent Flyer cards</b><br ></br>
                    Easily organize your collection of stream cards and choose which one to use for check-ins and shoutouts.
                  </p> 
                </li>
                <li>
                  <div className="icon"><i className="item-3 fa-solid fa-music"></i></div>
                  <p className="details">
                    <b className='headline'>Request Songs for Rhythm Game Streams</b><br ></br>
                    Looking for the perfect track? Use our searchable list to find and submit songs directly to the stream.
                  </p> 
                </li>
                <li>
                  <div className="icon"><i className="item-4 fa-solid fa-heart-circle-plus"></i></div>
                  <p className="details">
                    <b className='headline'>...plus more!</b><br ></br>
                    We're continuously adding new features to enhance your on-stream and off-stream experience. Stay tuned!
                  </p> 
                </li>
              </ul>
            </Tile>
          )}
        </div>
        {user && (
          <div className="layout-sub-row">
            <div className="col-a">
              <Tile extraClassName={'ranking top-spender'} icon={<i className="fa-solid fa-coins"></i>} title={'Top Channel Points Spenders'}>
                <Ranking rankType={'spender'} itemsToShow={5} valueLabels={'PTS'} enableUserView={(user !== null)} />
              </Tile>
            </div>
            <div className="col-b">
              <Tile extraClassName={'ranking top-checkins'} icon={<i className="fa-solid fa-passport"></i>} title={'Top Check-Ins'}>
                <Ranking rankType={'checkins'} itemsToShow={5} valueLabels={'strm'} enableUserView={(user !== null)} />
              </Tile>
            </div>
          </div>
        )}        
        
      </div>
      <div className="col-b">
        {user && user.user_card && (
          <Tile extraClassName={'user-card'} icon={<i className="fa-regular fa-id-card"></i>} title="User Card">
            <UserCardPreview cardName={user.user_card.sysname} cardTitle={user.user_card.name} isPremium={user.user_card.is_premium} isRare={user.user_card.is_rare} />
          </Tile>
        )}
        <Tile extraClassName={'ranking top-exp'} icon={<i className="fa-solid fa-ranking-star"></i>} title={'Community Ranking'}>
          <Ranking rankType={'exp'} itemsToShow={10} valueLabels={'exp'} enableUserView={(user !== null)} />
        </Tile>
      </div>
		</div>
    </>
	);
};

export default Home;
