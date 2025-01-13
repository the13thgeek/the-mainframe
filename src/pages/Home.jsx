import React, { useEffect, useState } from "react";
import { TWITCH_ACCESS_TOKEN, TWITCH_EXT_CLIENT_ID, thumbnailResize } from '../utils/twitch';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { getUserFromStorage } from "../utils/auth";
import { Link } from "react-router-dom";
import { dateFormatter } from "../utils/common";
import Tile from "../components/Tile";
import LiveStream from "../components/LiveStream";
import GachaCardList from '../components/GachaCardList';
import StreamSchedule from '../components/StreamSchedule';
import UserCardPreview from "../components/UserCardPreview";
import PlayerRanking from "../components/PlayerRanking";
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

    fetchLiveData();
  
  },[]);

	return (
    <main className="page-home">
      <div className="structure">
        <div className={'row initial'+(user ? ' logged' : '')}>
          <div className="col-a">
            <Tile extraClassName={'livestream-preview'} title={'Live Stream'}>
              <LiveStream liveData={liveData} />
            </Tile>
          </div>
          { user ? (
            <>
            <div className="col-b">
              <Tile extraClassName={'livestream-info'}>
                <Tabs className={'info-tabs'} selectedTabClassName='active'>
                  <TabList className={'tabs-list'}>
                    {(liveData?.game_name === 'StepMania') && (
                      <Tab disabledClassName='disabled'><span>Requests</span></Tab>
                    )}
                    { liveData && (
                      <Tab disabledClassName='disabled'><span>Stream</span></Tab>
                    ) }
                    <Tab disabledClassName='disabled'><span>Schedule</span></Tab>
                    { liveData ? (
                      <Tab disabledClassName='disabled'><span>Gacha</span></Tab>
                    ) : (
                      <Tab disabledClassName='disabled' disabled><span>Gacha</span></Tab>
                    )}
                  </TabList>
                  <div className="contents">
                    {(liveData?.game_name === 'StepMania') && (
                      <TabPanel className='panel song-requests' selectedClassName='active'>
                        <RequestsBar />
                      </TabPanel>
                    )}
                    { liveData && (
                      <TabPanel className='panel stream-info' selectedClassName='active'>
                        <div className="wrapper">
                          <h3 className="stream-title">{liveData.title}</h3>
                          <p>Now playing: <b>{liveData.game_name}</b></p>
                          <small>Started at {dateFormatter('simple-time',liveData.started_at)}</small>
                          <ul className="tags">
                            {liveData.tags.map((tag, idx) => (
                              <li key={idx}> {tag} </li>
                            ))}
                          </ul>
                          <p className='viewers'><i className="fa-solid fa-users"></i> {liveData.viewer_count} {liveData.viewer_count === 1 ? 'viewer' : 'viewers'}</p>
                        </div>
                      </TabPanel>
                    ) }
                    <TabPanel className='panel schedule' selectedClassName='active'>
                      <div className="wrapper">
                        <StreamSchedule />
                      </div>
                    </TabPanel>
                    <TabPanel className='panel gacha' selectedClassName='active'>
                      <div className="wrapper">
                        <GachaCardList />
                      </div>
                    </TabPanel>
                  </div>
                </Tabs>
              </Tile>
            </div>
            <div className="col-c">
              <Tile extraClassName={'user-card'} title={'User Card'}>
                <UserCardPreview userLevel={user.level} cardName={user.user_card.sysname} cardTitle={user.user_card.name} isPremium={user.user_card.is_premium} isRare={user.user_card.is_rare} isEvent={user.user_card.is_event} />
              </Tile>
            </div>
            </>
          ) : (
            <div className="col-b">
              <Tile title={'Welcome to the Mainframe!'} extraClassName={'welcome'}>
                <p>Connect with Twitch to unlock personalized stream features, exclusive perks and fun off-stream community activities!</p>
                <p>Log in to the Mainframe with your Twitch account to:</p>
                <ul className="perks">
                  <li>
                    <div className="icon"><i className="item-3 fa-solid fa-music"></i></div>
                    <p className="details">
                      <b className='headline'>Request Songs for Rhythm Game Streams</b><br ></br>
                      Looking for the perfect track? Use our searchable list to find and submit songs directly to the stream.
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
                    <div className="icon"><i className="item-1 fa-solid fa-user-plus"></i></div>
                    <p className="details">
                      <b className='headline'>Track Your Profile Stats</b><br ></br>
                      Earn EXP by watching <b>@the13thgeek's</b> streams, participating in chat and redeeming channel point rewards. See how you rank with your fellow geeks and level up!
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
            </div>
          )}
        </div>
        <div className="row">
          <Tile extraClassName={'player-top-ranking'} title={'Player Leaderboard'}>
            <PlayerRanking enableUserView={(user !== null)} />
          </Tile>
        </div>
        <div className="row links">
          <Tile extraClassName={'link-catalog'}>
            <div className="content">
              <h3>Catalog</h3>
              <p>Check the complete catalog of released user card designs. Organize your collection and find out more info on how to acquire specials and event exclusives!</p>
              <p><Link to="/catalog" className='btn'>View Catalog</Link></p>
            </div>
          </Tile>
          <Tile extraClassName={'link-poweredby'}></Tile>
        </div>
        <div className="row lists">
          <Tile extraClassName={'ranking spender'} title={'Top Channel Points Spenders'}>
            <Ranking rankType={'spender'} itemsToShow={5} valueLabels={'PTS'} enableUserView={(user !== null)} />
          </Tile>
          <Tile extraClassName={'ranking checkins'} title={'Latest Check-Ins'}>
            <Ranking rankType={'checkins_last'} itemsToShow={5} enableUserView={(user !== null)} />
          </Tile>
          <Tile extraClassName={'ranking achievements'} title={'Latest Achievements'}>
            <Ranking rankType={'achievements'} itemsToShow={5} enableUserView={(user !== null)} />
          </Tile>
        </div>
      </div>
      
      
    </main>
	);
};

export default Home;
