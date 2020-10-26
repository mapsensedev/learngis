import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const lat = 21.1458;
const long = 79.0882;

const map = L.map('map').setView([lat, long], 5);

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

/*===================================================================================================*/
