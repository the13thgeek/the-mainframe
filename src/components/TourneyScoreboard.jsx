import React, { useEffect, useState } from 'react';
import { truncateText } from "../utils/common";
import './TourneyScoreboard.scss';

const TourneyScoreboard = () => {
  const [scoreBoard, setScoreBoard] = useState(null);

  const convertTeamName = (num) => {
    switch (num) {
      case 1: return "Afterburner";
      case 2: return "Concorde";
      case 3: return "Stratos";
      default: return "(undefined)";
    }
  };

  const ALL_TEAMS = [
    { team_number: 1, team_name: "Delta Syndicate" },
    { team_number: 2, team_name: "Sigma Collective" },
    { team_number: 3, team_name: "Zeta Enclave" }
  ];
  const DEFAULT_TEAM = { total_points: 0, mvp: null, mvp_points: null };
  const getScore = (teamNumber) => scoreBoard?.find((t) => t.team_number === teamNumber)?.total_points ?? 0;
  const getMvp = (teamNumber) => scoreBoard?.find((t) => t.team_number === teamNumber)?.mvp ?? null;

  useEffect(() => {
      const fetchScores = async()  => {  
        try {
          const response = await fetch(`${import.meta.env.VITE_CLOUD_URL}/tourney/scores`,
            {
              method: 'POST',
              headers: {
                "x-api-key": import.meta.env.VITE_CLOUD_APIKEY,
                "Content-Type": "application/json"
              }
            });
          if(response) {
            const result = await response.json();
            const scores = result.data.scores;
            const normalizedScores = ALL_TEAMS.map((team) => {
              const found = scores.find((s) => s.team_number === team.team_number);
              return found ?? { ...DEFAULT_TEAM, ...team };
            });
            setScoreBoard(normalizedScores);

            //console.log(JSON.stringify(normalizedScores));
          }
        } catch(e) {
          console.log('[Scores] Error: ' + e.message);
        }
      };
  
      fetchScores();
  
    },[]);

  return (
    <>
      <div className='team-box team-1'>
        <h4>Delta Syndicate</h4>    
        <div className="mascot-bg"></div>
        <p className='team-score'>{getScore(1)}</p>
        {getMvp(1) !== null && (
          <div className='mvp'>
            <h5>{getMvp(1)}</h5>
            <small>MVP</small>
          </div>
        )}
      </div>
      <div className='team-box team-2'>
        <h4>Sigma Collective</h4>    
        <div className="mascot-bg"></div>
        <p className='team-score'>{getScore(2)}</p>
        {getMvp(2) !== null && (
          <div className='mvp'>
            <h5>{getMvp(2)}</h5>
            <small>MVP</small>
          </div>
        )}
      </div>
      <div className='team-box team-3'>
        <h4>Zeta Enclave</h4>    
        <div className="mascot-bg"></div>
        <p className='team-score'>{getScore(3)}</p>
        {getMvp(3) !== null && (
          <div className='mvp'>
            <h5>{getMvp(3)}</h5>
            <small>MVP</small>
          </div>
        )}
      </div>
    </>
  )
}

export default TourneyScoreboard