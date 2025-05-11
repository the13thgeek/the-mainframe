import React, { useEffect, useState } from 'react';
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
  }

  useEffect(() => {
      const fetchScores = async()  => {  
        try {
          const response = await fetch(`${import.meta.env.VITE_CLOUD_URL}/mainframe/showdown-scores`,
            {
              method: 'POST',
              headers: {
                "x-api-key": import.meta.env.VITE_CLOUD_APIKEY,
                "Content-Type": "application/json"
              }
            });
          if(response) {
            const result = await response.json();
            setScoreBoard(result.scoreboard);
          }
        } catch(e) {
          console.log('[Scores] Error: ' + e.message);
        }
      };
  
      fetchScores();
  
    },[]);

  return (
    <>
    {scoreBoard && scoreBoard.map((team, idx) => (
      <div class={'team-box team-'+team.team_number} key={idx}>
        {/* <h4>{convertTeamName(team.team_number)}</h4> */}
        <div className="mascot-bg"></div>
        <p className='team-score'>{team.total_points}</p>
        {team.mvp_display_name !== null && (
          <div className="mvp">
            <h5>{team.mvp_display_name}</h5>
            <small>Team MVP</small>
          </div>
        )}
      </div>
    ))}
    </>
  )
}

export default TourneyScoreboard