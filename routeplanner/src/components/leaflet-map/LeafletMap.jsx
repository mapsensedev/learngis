import React, { useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const LeafletMap = () => {
  const [position, setPosition] = useState([28.7041, 77.1025]);

  return (
    <Map id='map' center={position} zoom={8}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </Map>
  );
};

export default LeafletMap;
