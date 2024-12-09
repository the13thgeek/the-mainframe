import React, { useEffect } from "react";
import Tile from "../components/Tile";
import TwitchUserInfo from "../components/TwitchUserInfo";
import { getUserFromStorage } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const user = getUserFromStorage();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="layout-row">
      <div className="col-a">
        <Tile extraClassName={'profile'}>
          <TwitchUserInfo />
        </Tile>
      </div>
      <div className="col-b">
        B
      </div>
    </div>
  );
};

        export default Profile;