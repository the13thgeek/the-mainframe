import React, { useState, useEffect } from 'react';
import Modal from './Modal';
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
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  const openDialog = (status, message) => {
    setModalContent(
      <>
        <div className="icon">
          {status ? (
            <i className="fa-solid fa-circle-check"></i>
          ) : (
            <i className="fa-solid fa-circle-xmark"></i>
          )}
        </div>
        <div className="message">
          <p>{message}</p>
        </div>
      </>
    );
    setModalOpen(true);
  }

  const closeDialog = () => {
    setModalOpen(false);
  };

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

    const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
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
          if(result.status) {
            setStatus(result);
            setDataUrl(`/data/${result.id}.json`);
            setQueuedSongIds( result.queue.map((item) => item.id) );  
          }
          
        }
      } catch(e) {
        console.log('[SRS Status] Error: ' + e.message);
      }
    };

    fetchSrsStatus();
    

  },[]);

  const requestSong = async (id,title,artist,user) => {
    const requestCloud = await fetch(`${import.meta.env.VITE_CLOUD_URL}/srs/request-site`, {
      method: "POST",
      headers: {
          "x-api-key": import.meta.env.VITE_CLOUD_APIKEY,
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        title: title,
        artist: artist,
        user_name: user
      })
    });
    const data = await requestCloud.json();
    //console.log(data);
    //alert(data.message);
    openDialog(data.status,data.message);
    return false;
  }

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
    { status ? (
      <>
      <div className={`srs-indicator `+ (status.requests_open ? "on" : "off")}>
        <div className='status'>
          {status.requests_open ? (
            <>
            Requests OPEN
            </>
          ) : (
            <>
            Requests CLOSED
            </>
          )}
        </div>
        <div className="version">
          {status.title} ({status.year})
        </div>
      </div>
      <div className="song-search">
        <span className={`icon `+ (status.requests_open ? "on" : "off")}><i className="fa-solid fa-circle-play"></i></span>
        <input type="text" className="search" placeholder='Search for songs...' maxLength={50} onChange={handleInputChange} />
      </div>
      <div className="song-list">
        {filteredSongData && filteredSongData.map((song, idx) => (
          <div className="song-row" data-id={song.id} key={idx}>
            <div className="song-info">
              <b className='song-title' title={song?.romanizedTitle ? song?.romanizedTitle : song.title}>{song.title}</b><br />
              <span className="song-artist" title={song.romanizedArtist ? song.romanizedArtist : song.artist}>{song.artist}</span>
            </div>
            <div className="action">
              { !queuedSongIds.includes(song.id) && status.requests_open && (
                <button className="request" onClick={() => requestSong(song.id,song.title,song.artist,user.display_name)}>Request</button>
              ) }
              { queuedSongIds.includes(song.id) && status.requests_open && (
                <button className="request disabled" disabled>Queued</button>
              ) }
            </div>
          </div>
        ))}
        {filteredSongData?.length < 1 && (
          <p>No matching songs found.</p>
        )}
      </div>
      </>
    ) : (
      <div className="srs-notice">
        <p><i className="fa-solid fa-circle-info"></i> Please set the game version.</p>
      </div>
    )}
    <Modal isOpen={isModalOpen} onClose={() => closeDialog()} footer={<button onClick={closeDialog}>OK</button>}>
      {modalContent}
    </Modal>
    </>
  )
}

export default RequestsBar