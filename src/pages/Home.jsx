import React from "react";
import TwitchUserInfo from "../components/TwitchUserInfo";
import Tile from "../components/Tile";
import { getUserFromStorage } from "../utils/auth";

const Home = () => {
	const user = getUserFromStorage();
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
        B
      </div>
			
		</div>
	);
};

export default Home;
