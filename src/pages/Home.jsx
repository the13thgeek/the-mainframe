import React, { useEffect, useState } from "react";
import TwitchUserInfo from "../components/TwitchUserInfo";
import Tile from "../components/Tile";
import { getUserFromStorage } from "../utils/auth";

const Home = () => {
	const user = getUserFromStorage();
  const [rankData, setRankData] = useState(null);
  const [loadingPlayerRank, setLoadingPlayerRank] = useState(true);

  useEffect(() => {
    const fetchPlayerRanking = async()  => {
      try {
        const response = await fetch(`${import.meta.env.VITE_GEEKHUB_NODEJS_URL}/geekhub/exp-rank`,
          {
            method: 'POST',
            headers: {
              "x-api-key": import.meta.env.VITE_GEEKHUB_NODEJS_APIKEY,
              "Content-Type": "application/json"
            }
          });
        if(response) {
          const result = await response.json();
          setRankData(result);
          setLoadingPlayerRank(false);
        }
      } catch(e) {
        console.log(e.message);
      }
    };

    fetchPlayerRanking();
  },[]);

	return (
		<div className="layout-row">
      <div className="col-a">
        <Tile extraClassName={'profile'}>
          <TwitchUserInfo />
        </Tile>
        {user ? (
          <>
          <p>Hello there</p>
          </>
        ) : (
          <>
          <h1>Welcome to the Twitch Auth App</h1>
          <p>Log in to view your profile!</p>
          </>
        )}
      </div>
      <div className="col-b">
        <Tile extraClassName={'ranking top-exp'} icon={<i className="fa-solid fa-trophy"></i>} title={'Player Ranking'}>
          <div className="grid-ranking">
            {rankData && rankData.map((rankItem,idx) => (
              <div className="row" key={idx}>
                <div className="rank">#{idx+1}</div>
                <div className="player">
                  <h4>{rankItem.twitch_display_name}</h4>
                  <div className="data">Level {rankItem.level} • <span className="title">{rankItem.title}</span></div>
                </div>
              </div>
            ))}
          </div>
        </Tile>
      </div>
			
		</div>
	);
};

export default Home;
