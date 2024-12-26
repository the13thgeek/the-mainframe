# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.2c] - 2024-12-25
### Added
- Event Exclusive Card Type
- Updated achievement badges

### Changed
- Tile design for widget titles
- Homepage - changed Check-in Ranking to Latest Check-ins
- Stats: Renamed CP-PTS
- Changed numbers formatting to add separator commas

## [0.5.2b] - 2024-12-20
### Added
- Global Test Notice

### Fixed
- WebSocket URL

### Changed
- Changed CP to PTS in Points Spender Rankings

## [0.5.2] - 2024-12-20
### Added
- Achievements description
- CNAME record
- Footer

### Changed
- Sorting of achievements are now in Tier-descending

## [0.5.1] - 2024-12-18
### Added
- Player Stats
- Player Achievements
- Stepmania songs DB

### Changed
- Player Stats layout
- Changed song request prompts to Modal

### Fixed
- Requests song section not updating when song is requested
- Added handling for null live feed data
- Added handling for null SRS relay

## [0.5] - 2024-12-15
### Changed
- Prompt dialogs from alert() to Modal
- Community Ranking icons
- EXP bar to a standalone, reusable component
- Added subtle shadows to Level Titles for readability
- Ranking usernames are made clickable for logged-in users
- Header gradient colour
- Navigation bar to become fixed to the top of the page
- EXP bar animation
- Promoted UserCard() to a common utility function

### Added
- Modals: Prompts
- Modals: User Preview Cards

## [0.4.1] - 2024-12-13
### Changed
- Overall colour scheme
- Minor layout changes/fixes

## [0.4] - 2024-12-11
### Added
- Change active card functionality
- Rankings widgets
- New upcoming card designs

### Changed
- Ranking widgets optimized

## [0.3] - 2024-12-09
### Added
- User Card previews
- Revamped H1 theMainframe logo
- UserCardPreview on the home page
- Rhythm Game request bar (status+search box)

## [0.2] - 2024-12-09
### Added
- Community Ranking
- Live Stream info
- Profile Page
- User Level colour schemes
- Welcome/invitation text

## Changed
- Renamed site name to theMainFrame
- Moved the Twitch Live integration from theCloud to local to ease traffic
- User info (titles, exp, level) colour schemes are now tied to their level colours

## [0.1] - 2024-12-08
### Added
- Initial build
- Set up Twitch integration
- Added Home Page/Profile
- Added connection to NodeJS service for player data