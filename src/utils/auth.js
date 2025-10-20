export const TWITCH_CLIENT_ID = import.meta.env.VITE_TWITCH_CLIENT_ID;
export const TWITCH_REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export const getAuthUrl = () => 
  `https://id.twitch.tv/oauth2/authorize?client_id=${TWITCH_CLIENT_ID}&redirect_uri=${encodeURIComponent(TWITCH_REDIRECT_URI)}&response_type=token&scope=`;

export const getUserFromStorage = () => JSON.parse(sessionStorage.getItem("twitchUser"));

export const saveUserToStorage = (user) => sessionStorage.setItem("twitchUser", JSON.stringify(user));

export const clearUserFromStorage = () => sessionStorage.removeItem("twitchUser");