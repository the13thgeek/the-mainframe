import React from 'react';
import TwitchUserInfo from './TwitchUserInfo';
import './SectionTitle.scss';

const SectionTitle = () => {
  return (
    <section className="title-global">
      <div className="structure">
        <div className="global-bar">
          <h1 className='site-title'>
            <span className="the">the</span>
            <span className="mainframe-box">
              <span className="text">Mainframe</span>
            </span>
            &trade;
          </h1>
          <TwitchUserInfo />
        </div>
      </div>

    </section>
  )
}

export default SectionTitle