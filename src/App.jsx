import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
//import TwitchUserInfo from "./components/TwitchUserInfo";
import Navigation from "./components/Navigation";
import SectionTitle from "./components/SectionTitle";
//import Tile from "./components/Tile";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Catalog from "./pages/Catalog";
//import GlobalNotice from "./components/GlobalNotice";
import { TWITCH_REDIRECT_URI, TWITCH_CLIENT_ID, saveUserToStorage } from "./utils/auth";
import './App.scss';

function App() {
    useEffect(() => {
        const hash = window.location.hash;
        if (hash.includes("access_token")) {
            const params = new URLSearchParams(hash.slice(1)); // Remove the `#`
            const accessToken = params.get("access_token");

            if (accessToken) {
                fetch("https://api.twitch.tv/helix/users", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Client-Id": TWITCH_CLIENT_ID,
                    },
                })
                .then((res) => res.json())
                .then(async (data) => {
                    let user = data.data[0];

                    return fetch(`${import.meta.env.VITE_CLOUD_URL}/mainframe/login-widget`, {
                        method: 'POST',
                        headers: {
                            "x-api-key": import.meta.env.VITE_CLOUD_APIKEY,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            twitch_id: user.id,
                            twitch_display_name: user.display_name,
                            twitch_avatar: user.profile_image_url
                        })
                    })
                    .then((res) => res.json())
                    .then((localData) => {
                        if(localData) {
                            user = { ...user, ...localData };
                        }
                        saveUserToStorage(user);                        
                        window.location.hash = "#/"; // Clean URL, keep `HashRouter` path
                        window.location.reload(); // Reload to update UI
                    });
                    
                    
                });
            }
           
        }
    }, []);

    return (
        <>
        <Router>
            <Navigation />
            <SectionTitle />
            <main>
              <div className="structure">
                {/* <Tile extraClassName={'global-notice'}>
                    <GlobalNotice
                        icon={<i className="fa-solid fa-circle-exclamation"></i>}
                        type={'In Active Development'}
                        message={'System is currently in testing. All player data (EXP/level/achievements/stats) will reset on January 1st, 2025. Collected cards will be preserved. Please report any bugs or issues to @the13thgeek!'}
                    />
                </Tile> */}
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/catalog" element={<Catalog />} />
              </Routes>
              </div>
            </main>
            <footer>
                <div className="structure">
                    <p>v{import.meta.env.VITE_APP_VER}</p>
                </div>
            </footer>
        </Router>
        </>
    )
}

export default App
