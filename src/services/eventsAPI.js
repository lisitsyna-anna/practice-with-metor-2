import axios from 'axios';

const KEY = 'tIj1kC332ExvV8vs1uBAp1fasaO5ERpG';
axios.defaults.baseURL = 'https://app.ticketmaster.com/discovery/v2/';

export const fetchEvents = async () => {
  const response = await axios('events', {
    params: {
      apikey: KEY,
    },
  });
  return response.data._embedded.events;
};

export const fetchEventById = async id => {
  const response = await axios(`events/${id}`, {
    params: {
      apikey: KEY,
    },
  });

  return response.data;
};

export const fetchEventByName = async keyword => {
  const response = await axios('events', {
    params: {
      apikey: KEY,
      keyword,
    },
  });
  return response.data._embedded.events;
};
