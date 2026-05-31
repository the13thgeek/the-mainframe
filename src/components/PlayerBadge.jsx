import React from 'react';
import './PlayerBadge.scss';

const badgeMap = {
  elite : { full: 'Élite', short: 'ELT', description: 'Mode Élite: Business Class' },
  afterburner : { full: 'Afterburner', short: 'AFB', description: 'Afterburner Faction' },
  concorde: { full: 'Concorde', short: 'CCD', description: 'Concorde Faction' },
  stratos: { full: 'Stratos', short: 'STS', description: 'Stratos Faction'},
  acolyte: { full: 'Acolyte', short: 'ACL', description: 'Acolyte [6+ mos Subscriber]' },
  striker: { full: 'Striker', short: 'STK', description: 'Striker [12+ mos Subscriber]' },
  cipher: { full: 'Cipher', short: 'CIP', description: 'Cipher [18+ mos Subscriber]' },
  prime: { full: 'Prime', short: 'PRM', description: 'Prime [24+ mos Subscriber]' },
  ascendant: { full: 'Ascendant', short: 'ASC', description: 'Ascendant [36+ mos Subscriber]' },
  team1: { full: 'Delta Syndicate', short: 'DELTA', description: 'Delta Syndicate Faction' },
  team2: { full: 'Sigma Collective', short: 'SIGMA', description: 'Sigma Collective Faction' },
  team3: { full: 'Zeta Enclave', short: 'ZETA', description: 'Zeta Enclave Faction' },
  basic: { full: 'Null', short: 'NUL' }, // fallback entry
};

const PlayerBadge = ({ badgeName, short = false}) => {
  const key = badgeName.toLowerCase();
  const safeBadge = badgeMap[key] ? key : 'basic';
  const badgeInfo = badgeMap[safeBadge];

  if(badgeInfo.short === 'NUL') {
    console.log(`Null: ${badgeName}`);
  }
  

  return (
    <div className={`badge badge-${safeBadge} `} title={badgeInfo.description}><span>{ short ? badgeInfo.short : badgeInfo.full }</span></div>
  )
}

export default PlayerBadge