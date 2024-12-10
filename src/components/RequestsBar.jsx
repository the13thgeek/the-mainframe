import React, { useState, useEffect } from 'react';
import './RequestsBar.scss';

const RequestsBar = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {

    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event) => {
      let srsRelayData = JSON.parse(event.data);
      setStatus(srsRelayData.srs);
    };

    const fetchSrsStatus = async()  => {
      try {
        const response = await fetch(`${import.meta.env.VITE_CLOUD_URL}/srs/status`,
          {
            method: 'POST',
            headers: {
              "x-api-key": import.meta.env.VITE_CLOUD_APIKEY,
              "Content-Type": "application/json"
            }
          });
        if(response) {
          const result = await response.json();
          setStatus(result);
        }
      } catch(e) {
        console.log('[SRS Status] Error: ' + e.message);
      }
    };

    fetchSrsStatus();

  },[]);

  return (
    <>
    { status && (
      <>
      <div className={`srs-indicator `+ (status.requests_open ? "on" : "off")}>
        <div className='status'>
          {status.requests_open ? (
            <>
            <i className="fa-solid fa-music"></i> Requests OPEN
            </>
          ) : (
            <>
            <i className="fa-solid fa-circle-pause"></i> Requests CLOSED
            </>
          )}
        </div>
        <div className="version">
          {status.title} ({status.year})
        </div>
      </div>
      <div className="song-search">
        <span className={`icon `+ (status.requests_open ? "on" : "off")}><i className="fa-solid fa-circle-play"></i></span>
        <input type="text" className="search" placeholder='Search songs...' maxLength={50} />
      </div>
      </>
    )}


    
    
    
    <pre>
      {JSON.stringify(status,null,2)}
    </pre>
    </>
  )
}

export default RequestsBar