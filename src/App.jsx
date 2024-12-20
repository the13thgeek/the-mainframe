import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
//import TwitchUserInfo from "./components/TwitchUserInfo";
import Navigation from "./components/Navigation";
import SectionTitle from "./components/SectionTitle";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
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
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
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
