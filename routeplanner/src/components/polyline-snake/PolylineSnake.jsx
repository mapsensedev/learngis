import L from 'leaflet';
import 'leaflet.polyline.snakeanim/L.Polyline.SnakeAnim.js';

import { useEffect } from 'react';
import { useLeafletMap } from 'use-leaflet';

const PolylineSnake = ({ waypoints, trigger }) => {
  const map = useLeafletMap();

  useEffect(() => {
    var line = L.polyline(waypoints, { snakingSpeed: 200 });

    if (!trigger) {
      return;
    }

    map.addLayer(line);

    line.snakeIn();

    // line.on('snakestart snake snakeend', (ev) => {
    //   console.log(ev.type);
    // });
    // console.log(line);
    // console.log(map);
  }, [trigger]);

  return null;
};

export default PolylineSnake;
