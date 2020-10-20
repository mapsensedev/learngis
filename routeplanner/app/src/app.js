import locations from './data/locations.json';

import { addDraggableMarker } from './here/markers';
import { addCircle, addPolyLine } from './here/geoShapes';

import axios from 'axios';

var platform = new H.service.Platform({
  apikey: '71fC1FnumWqaRwJJ4IG_fxp5g4YQoUwaUcnh1tZmH4k',
});

const center = { lng: 77.1025, lat: 28.7041 };

var maptypes = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('mapContainer'), maptypes.vector.normal.map, {
  zoom: 10,
  center,
});

// const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
// const provider = map.getBaseLayer().getProvider();
// const router = platform.getRoutingService();
// const geocoder = platform.getGeocodingService();

window.addEventListener('resize', () => map.getViewPort().resize());

let destinations = [];
// let destinationsDos = [];

locations.forEach((location, index) => {
  let key = `destination${index + 1}`;
  let value = `location_${index};${location.Latitude},${location.Longitude}`;
  destinations.push({ [key]: value });
  // destinationsDos.push(`${key}:${value}`);
});

// console.log(...destinationsDos.join(',').split(' '));

// addDraggableMarker(behavior, center, map);

// addCircle(center, 8000, map);

// addPolyLine(points, map);

/*===============================================================================================*/
const base = 'https://wse.ls.hereapi.com/2/findsequence.json';
const mode_type = 'fastest'; //
const transport_mode = 'car'; //
const traffic_mode = 'traffic:disabled'; //
const mode = `${mode_type};${transport_mode};${traffic_mode}`; //

let destinationsQuery = '?';

destinations.forEach((pair) => {
  destinationsQuery += `${Object.keys(pair)}=${Object.values(pair).join('').replace('&', '%26')}&`;
});

axios
  .get(base + destinationsQuery, {
    params: {
      mode: mode,
      apiKey: 'iqsfhgYI61lMTK_REl1S9WxXinHvxC5SA6VOXt0U_10',
      start: 'Parts Plus;39.66385,-75.56709',
    },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
