import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.min.js';

export const addMarker = (latlng, type, map) => {
  var awesomeMarker;

  switch (type) {
    case 'start':
      awesomeMarker = L.AwesomeMarkers.icon({
        icon: 'play',
        prefix: 'fa',
        markerColor: 'green',
      });
      break;
    case 'end':
      awesomeMarker = L.AwesomeMarkers.icon({
        icon: 'stop',
        prefix: 'fa',
        markerColor: 'blue',
      });
      break;

    default:
      awesomeMarker = L.AwesomeMarkers.icon({
        icon: 'car',
        prefix: 'fa',
        markerColor: 'gray',
      });
      break;
  }

  L.marker(latlng, { icon: awesomeMarker }).addTo(map);
};
