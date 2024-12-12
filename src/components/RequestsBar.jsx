import React, { useState, useEffect } from 'react';
import { getUserFromStorage } from "../utils/auth";
import './RequestsBar.scss';

const RequestsBar = () => {
  const user = getUserFromStorage();
  const [queuedSongIds, setQueuedSongIds] = useState();
  const [status, setStatus] = useState(null);
  const [dataUrl, setDataUrl] = useState("");
  const [songData, setSongData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSongData, setFilteredSongData] = useState(null);

  useEffect(() => {
    if(!dataUrl) return;

    const fetchData = async () => {
      const response = await fetch(dataUrl);
      if(!response.ok) {
        throw new Error(response.status);
      }
      const json = await response.json();
      setSongData(json.songs);
      setFilteredSongData(json.songs);
    }

    fetchData();
  },[dataUrl]);

  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    if(songData) {
      const filteredSongs = songData.filter((song) => {
        const songValues = [
          song.title ? song.title.toLowerCase() : '',
          song.romanizedTitle ? song.romanizedTitle.toLowerCase() : '',
          song.artist ? song.artist.toLowerCase() : '',
          song.romanizedArtist ? song.romanizedArtist.toLowerCase() : '',
        ];

        return songValues.some((value) => value.includes(lowerSearchTerm));
      });
      setFilteredSongData(filteredSongs);
    } else {
      setFilteredSongData(songData);
    }

  },[searchTerm]);

  useEffect(() => {

    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event) => {
      let srsRelayData = JSON.parse(event.data);
      setStatus(srsRelayData.srs);
      
      if(srsRelayData.srs) {
        setDataUrl(`/data/${srsRelayData.srs.id}.json`);
        setQueuedSongIds( srsRelayData.srs.queue.map((item) => item.id) );  
      }
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
          setDataUrl(`/data/${result.id}.json`);
          setQueuedSongIds( result.queue.map((item) => item.id) );  
        }
      } catch(e) {
        console.log('[SRS Status] Error: ' + e.message);
      }
    };

    fetchSrsStatus();
    

  },[]);

  const requestSong = async (title,artist,user) => {
    const requestCloud = await fetch(`${import.meta.env.VITE_CLOUD_URL}/srs/request-site`, {
      method: "POST",
      headers: {
          "x-api-key": import.meta.env.VITE_CLOUD_APIKEY,
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        artist: artist,
        user_name: user
      })
    });
    const data = await requestCloud.json();
    //console.log(data);
    alert(data.message);
  }

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
        <input type="text" className="search" placeholder='Search songs...' maxLength={50} onChange={handleInputChange} />
      </div>
      <div className="song-list">
        {filteredSongData && filteredSongData.map((song) => (
          <div className="row" key={song.id}>
            <div className="song-info">
              <b className='song-title' title={song?.romanizedTitle ? song?.romanizedTitle : song.title}>{song.title}</b><br />
              <span className="song-artist" title={song.romanizedArtist ? song.romanizedArtist : song.artist}>{song.artist}</span>
            </div>
            <div className="action">
              { !queuedSongIds.includes(song.id) && status.requests_open && (
                <button className="request" onClick={() => requestSong(song.title,song.artist,user.display_name)}>Request</button>
              ) }
              { queuedSongIds.includes(song.id) && status.requests_open && (
                <button className="request disabled" disabled>Queued</button>
              ) }
            </div>
          </div>
        ))}
      </div>
      </>
    )}
    </>
  )
}

export default RequestsBar