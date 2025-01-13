export const UserCard = (cardName) => {
  const imageURL = `/assets/cards/${cardName}.png`;
  return imageURL;
}
export const dateFormatter = (format,input) => {
  let initDate = new Date(input);
  let options = {};
  let output = "";

  switch(format) {
      // output: "M/D/YYYY"
      case 'simple-date':
          options = {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
          };
          output = initDate.toLocaleDateString('en-US', options);
          break;
      // output: "H:MM AM/PM"
      case 'simple-time':
          options = {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
              timeZone: 'America/Toronto'
          };
          output = initDate.toLocaleTimeString('en-US',options) + " EST";
          break;
      // output: "MM.DD.YYYY"
      case 'simple-date-dot':
          const mm = (initDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
          const dd = initDate.getDate().toString().padStart(2, '0');
          const yyyy = initDate.getFullYear();
          output = `${mm} . ${dd} . ${yyyy}`;
          break;
      // output: "Monday, Jan 1, 2024"
      case 'date-with-day':
          options = {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              timeZone: 'America/Toronto'
          };
          output = initDate.toLocaleString('en-US',options);
          break;
      default: 
          output = input;
          break;
  }   

  return output;
}