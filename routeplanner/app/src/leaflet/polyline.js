export const addPolyline = (latlngs, map) => {
  var polyline = L.polyline(latlngs, { color: 'red' }).addTo(map);
  map.fitBounds(polyline.getBounds());
};
