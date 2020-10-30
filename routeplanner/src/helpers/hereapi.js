import axios from 'axios';

export const findSequence = async (locations, source) => {
  // persisting waypoints to avoid frequent api calls
  // if (window.localStorage.getItem('latlngs')) {
  //   return JSON.parse(window.localStorage.getItem('latlngs'));
  // }

  let destinations = [];
  let sequence = [];

  let start = '';

  if (source) {
    start = `location_start;${source[0]},${source[1]}`;
  } else {
    start = `location_start;${locations[0].Latitude},${locations[0].Longitude}`;
    locations.shift();
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
      sequence.push([point.lat, point.lng]);
    });
  } catch (error) {
    console.log(error.response);
  }

  // window.localStorage.setItem('latlngs', JSON.stringify(latlngs));

  return sequence;
};

export const calculateRoute = async (locations, source) => {
  let waypoints = [];
  let track = [];

  locations.forEach((location, index) => {
    let key = `waypoint${index}`;
    let value = `geo!${location[0]},${location[1]}`;
    waypoints.push({ [key]: value });
  });

  const base = 'https://route.ls.hereapi.com/routing/7.2/calculateroute.json';

  const mode_type = 'fastest'; //

  const transport_mode = 'car'; //

  const traffic_mode = 'traffic:disabled'; //

  const mode = `${mode_type};${transport_mode};${traffic_mode}`; //

  let waypointsQuery = '?';

  waypoints.forEach((pair) => {
    waypointsQuery += `${Object.keys(pair)}=${Object.values(pair)}&`;
  });

  try {
    const response = await axios.get(base + waypointsQuery, {
      params: {
        apiKey: 'iqsfhgYI61lMTK_REl1S9WxXinHvxC5SA6VOXt0U_10',
        mode: mode,
        representation: 'display',
      },
    });

    track = response.data.response.route[0].shape.map((point) => point.split(','));
  } catch (error) {
    console.log(error);
  }

  return track;
};
