import React, { useEffect, useState } from 'react';
import './FlightLog.scss';
import { getUserFromStorage } from "../utils/auth";
import Tile from "../components/Tile";

const FlightReport = () => {
  const user = getUserFromStorage();
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    if(!user) return;

    const getFlightReport = async () => {
      const result = await fetch(`${import.meta.env.VITE_CLOUD_URL}/mainframe/flight-report`, {
        method: 'POST',
        headers: {
            "x-api-key": import.meta.env.VITE_CLOUD_APIKEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_name: user.display_name
        })
      });
      const data = await result.json();
      setReportData(data.data[0]);
    };

    getFlightReport();

  }, [user]);

  return (
    <main className='page-flight-report'>
      <div className="structure">
        <div className="row">
          <Tile extraClassName={'flight-report'}>
            <section className="front-page">
              <h1>Flight Log</h1>
              {user && reportData ? (
                <>
                <h2>Your 2025 Journey With Us</h2>
                <img className='photo' src={reportData.twitch_avatar} alt="Your Photo" />
                <p className='user-name'>@{user.display_name}</p>
                <pre>
                  {JSON.stringify(reportData, null, 2)}
                </pre>
                </>
              ) : (
                <p className='instruction'>To see your flight report for 2025, click on <b>Mainframe Login</b>!</p>
              )}
              
            </section>
          </Tile>
          
        </div>
      </div>
    </main>
  )
}

export default FlightReport