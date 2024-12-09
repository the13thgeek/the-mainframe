export const TWITCH_ACCESS_TOKEN = import.meta.env.VITE_TWITCH_ACCESS_TOKEN;
export const TWITCH_EXT_CLIENT_ID = import.meta.env.VITE_TWITCH_EXT_CLIENT_ID;

export const thumbnailResize = (url,width,height) => {
  if (typeof url === 'undefined') {
    console.error('URL is undefined');
    console.error(width + 'x' + height);
    return;
  }

  return url
  .replace(/%\{width\}|\{width\}/g, width)
  .replace(/%\{height\}|\{height\}/g, height);
}