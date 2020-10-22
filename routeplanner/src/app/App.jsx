import React, { useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';

import { Button } from 'antd';
import { Upload, message } from 'antd';

import { InboxOutlined } from '@ant-design/icons';

import { csvToJson } from '../helpers/parser';

import './app.scss';

import 'leaflet/dist/leaflet.css';
import 'antd/dist/antd.css';

const App = () => {
  const { Dragger } = Upload;

  const [position, setPosition] = useState([28.7041, 77.1025]);
  const [locations, setLocations] = useState([]);

  function fileUploadHandler(event) {
    console.log(event);

    const { file } = event;
    const reader = new FileReader();

    if (file.status !== 'removed') {
      reader.readAsText(file);

      reader.onload = () => {
        setLocations(csvToJson(reader.result));
      };
    }
  }

  return (
    <div className='wrapper'>
      <Map id='map' center={position} zoom={8}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
      <div id='controls'>
        <div className='left'>
          <Dragger
            name='file'
            onChange={(event) => fileUploadHandler(event)}
            beforeUpload={() => false}
            multiple={false}
            accept='.csv'
          >
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>Click or drag a file to this area to upload</p>
            <p className='ant-upload-hint'>
              File must contain a column with any of the following headers : Lat/Long , X/Y ,
              Latitude/Longitude , Easting/Northing
            </p>
          </Dragger>
        </div>
        <div className='right'></div>
      </div>
    </div>
  );
};

export default App;
