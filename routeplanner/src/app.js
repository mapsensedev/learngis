// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// import axios from 'axios';

// import locations from './data/locations.json';

// import { addMarker } from './leaflet/ui/markers';
// import { createRoute } from './leaflet/vectors/polylines';

// const lat = 21.1458;
// const long = 79.0882;

// const map = L.map('map').setView([lat, long], 5);

// const attribution =
//   '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// const tiles = L.tileLayer(tileUrl, { attribution });
// tiles.addTo(map);

// /*===================================================================================================*/

// let destinations = [];

// locations.forEach((location, index) => {
//   let key = `destination${index + 1}`;
//   let value = `location_${index};${location.Latitude},${location.Longitude}`;
//   addMarker([location.Latitude, location.Longitude], 'normal', map);
//   destinations.push({ [key]: value });
// });

// const base = 'https://wse.ls.hereapi.com/2/findsequence.json';
// const mode_type = 'fastest'; //
// const transport_mode = 'car'; //
// const traffic_mode = 'traffic:disabled'; //
// const mode = `${mode_type};${transport_mode};${traffic_mode}`; //

// let destinationsQuery = '?';

// destinations.forEach((pair) => {
//   destinationsQuery += `${Object.keys(pair)}=${Object.values(pair).join('').replace('&', '%26')}&`;
// });

// axios
//   .get(base + destinationsQuery, {
//     params: {
//       mode: mode,
//       apiKey: 'iqsfhgYI61lMTK_REl1S9WxXinHvxC5SA6VOXt0U_10',
//       start: 'Parts Plus;39.66385,-75.56709',
//     },
//   })
//   .then(function (response) {
//     let latlngs = [];

//     response.data.results[0].waypoints.forEach((point) => {
//       latlngs.push([point.lat, point.lng]);
//     });

//     createRoute(latlngs, map);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
