import axios from 'axios';

export const getRoute = async (locations, source) => {
  // persisting waypoints to avoid frequent api calls

  if (window.localStorage.getItem('latlngs')) {
    return JSON.parse(window.localStorage.getItem('latlngs'));
  }

  let destinations = [];
  let latlngs = [];

  let start = '';

  if (source) {
    start = `location_start;${source[0]},${source[1]}`;
  } else {
    start = `location_start;${locations[0].Latitude},${locations[0].Longitude}`;
  }

  locations.forEach((location, index) => {
    let key = `destination${index + 1}`;
    let value = `location_${index};${location.Latitude},${location.Longitude}`;
    destinations.push({ [key]: value });
  });

  const base = 'https://wse.ls.hereapi.com/2/findsequence.json';

  const mode_type = 'fastest'; //

  const transport_mode = 'car'; //

  const traffic_mode = 'traffic:disabled'; //

  const mode = `${mode_type};${transport_mode};${traffic_mode}`; //

  let destinationsQuery = '?';

  destinations.forEach((pair) => {
    destinationsQuery += `${Object.keys(pair)}=${Object.values(pair)
      .join('')
      .replace('&', '%26')}&`;
  });

  try {
    const response = await axios.get(base + destinationsQuery, {
      params: {
        mode: mode,
        apiKey: 'iqsfhgYI61lMTK_REl1S9WxXinHvxC5SA6VOXt0U_10',
        start: start,
      },
    });

    response.data.results[0].waypoints.forEach((point) => {
      latlngs.push([point.lat, point.lng]);
    });
  } catch (error) {
    console.log(error);
  }

  window.localStorage.setItem('latlngs', JSON.stringify(latlngs));

  return latlngs;
};
