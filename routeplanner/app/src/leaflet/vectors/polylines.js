import { addMarker } from '../ui/markers';

export const createRoute = (latlngs, map) => {
  let start = latlngs[0];
  let end = latlngs[latlngs.length - 1];

  addMarker(start, 'start', map);
  addMarker(end, 'end', map);

  let polyline = L.polyline(latlngs, { color: 'red' }).addTo(map);
  map.fitBounds(polyline.getBounds());
};
