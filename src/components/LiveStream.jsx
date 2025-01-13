import React from 'react';
import './LiveStream.scss';

const LiveStream = ({ liveData = null }) => {
  return (
    <>
    <div className="screen" style={{ backgroundImage: `url(${liveData?.thumbnail_url || '/assets/stream-offline.jpg'})` }}>
      {liveData ? (
        <>
        <div className="live-indicator"><i className="fa-solid fa-video"></i> Now Live</div>
        <a href="https://twitch.tv/the13thgeek" target='_blank' className="action">
          <img src={liveData?.thumbnail_url || '/assets/stream-offline.jpg'} />
        </a>
        </>
      ): (
        <div className="live-indicator-offline"><i className="fa-solid fa-video"></i> Stream is offline</div>
      )}      
    </div>
      <div className={'now-streaming ' + (liveData ? 'live' : 'offline') }>
        { liveData ? (
          <>
          <h4>{liveData.title}</h4>
          <p>Now Playing: {liveData.game_name}</p>
          </>
        ) : (
          <h4>Stream Offline</h4>
        )}
        
      </div>
      <div className="call-to-action">
        <a href="https://twitch.tv/the13thgeek" target='_blank' className="btn watch-live">{ liveData ? 'Watch Live' : 'Visit Channel' }</a>
      </div>


    {/* <div className="live-info">
      { liveData && (
        <div className="now-streaming">
          <div className="icon">
            <i className="fa-solid fa-gamepad"></i>
          </div>
          <div className="details">
            <h3>{liveData.title}</h3>
            <p className='game-title'>Playing: {liveData.game_name}</p>
            <ul className="tags">
              {liveData.tags.map((tag,idx) => (
                <li key={idx}>{tag}</li>
              ))}
            </ul>
            <p className='viewers'><i className="fa-solid fa-users"></i> {liveData.viewer_count} {liveData.viewer_count === 1 ? 'viewer' : 'viewers'}</p>
          </div>
        </div>  
      )}
    </div>     */}

    </>
  )
}

export default LiveStream