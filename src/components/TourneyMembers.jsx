import React, { useState, useEffect } from 'react';
import './TourneyMembers.scss';

const TourneyMembers = () => {
  const [membersList, setMembersList] = useState(null);

  const team_names = [null, "Delta Syndicate", "Sigma Collective", "Zeta Enclave"];

  useEffect(() => {
    const fetchMembersList = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_CLOUD_URL}/tourney/members`,
          {
            method: 'POST',
            headers: {
              "x-api-key": import.meta.env.VITE_CLOUD_APIKEY,
              "Content-Type": "application/json"
            }
          }
        );
        if(response) {
          const result = await response.json();
          setMembersList(result.data);
        }
      } catch(e) {
        console.log('[Scores] Error: ' + e.message);
      }
    };

    fetchMembersList();
  },[]);

  return (
    <>  
    {membersList && membersList.map(team => (
      <div key={team.teamNumber} className={`team-`+team.teamNumber}>
        <h4>{team_names[team.teamNumber]}</h4>
        <ul className="members">
          {team.players.map((player, idx) => (
            <li key={idx}>
              <span className="name">{player.name}</span>
              {idx === 0 && (<span className='mvp'>MVP</span>)}
              <span className="score">{player.points}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
    </>
  )
}

export default TourneyMembers