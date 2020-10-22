import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet.awesome-markers';
import { Map, TileLayer, Marker, FeatureGroup } from 'react-leaflet';

import { Button, Space, Upload, Table } from 'antd';

import { InboxOutlined } from '@ant-design/icons';

import { csvToJson } from '../helpers/parser';

import './app.scss';
import 'leaflet/dist/leaflet.css';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'antd/dist/antd.css';

const markerIcon = new L.AwesomeMarkers.icon({
  icon: 'car',
  prefix: 'fa',
  markerColor: 'blue',
});

const App = () => {
  const { Dragger } = Upload;

  const [viewport, setViewport] = useState({
    center: [39.66385, -75.56709],
    zoom: 9,
  });

  const [file, setFile] = useState({});
  const [fileList, setFileList] = useState([]);

  const [locations, setLocations] = useState([]);

  const [isTableDataPresent, setIsTableDataPresent] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [areMarkersVisible, setAreMarkersVisible] = useState(false);

  const mapRef = useRef();
  const markersRef = useRef();

  useEffect(() => {
    populateTable(locations);
  }, [locations]);

  useEffect(() => {
    if (Object.keys(file).length === 0 && file.constructor === Object) {
      setIsTableDataPresent(false);
      setLocations([]);
    } else {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        setLocations(csvToJson(reader.result));
      };
      setIsTableDataPresent(true);
    }
  }, [file]);

  useEffect(() => {
    if (fileList.length === 1) {
      setFile(fileList[0]['originFileObj']);
    } else {
      setIsTableDataPresent(false);
      setLocations([]);
    }
  }, [fileList]);

  function fileUploadHandler(event) {
    let fileList = [...event.fileList];
    fileList = fileList.slice(-1);
    setFileList(fileList);
  }

  function toggleTableVisibility() {
    if (isTableVisible) {
      setIsTableVisible(false);
    } else {
      setIsTableVisible(true);
    }
  }

  function toggleMarkersVisibility() {
    if (areMarkersVisible) {
      setAreMarkersVisible(false);
    } else {
      setAreMarkersVisible(true);

      if (mapRef.current && mapRef.current) {
        const map = mapRef.current.leafletElement;
        const markers = mapRef.current.leafletElement;

        const { _northEast, _southWest } = markers.getBounds();

        map.flyToBounds([
          [_northEast.lat, _northEast.lng],
          [_southWest.lat, _southWest.lng],
        ]);
      }
    }
  }

  function populateTable(locations) {
    if (locations.length > 1) {
      let columns = Object.keys(locations[0]).map((item) => ({
        title: item,
        dataIndex: camelize(item),
        key: camelize(item),
      }));

      let data = locations.map((item, index) => {
        let row = {};

        for (let key of Object.keys(item)) {
          row[camelize(key)] = item[key];
        }

        row['key'] = index + 1;
        return row;
      });

      setTableColumns(columns);
      setTableData(data);
    }
  }

  function camelize(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }

  return (
    <div className='wrapper'>
      <Map id='map' ref={mapRef} viewport={viewport}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <FeatureGroup ref={markersRef}>
          {isTableDataPresent && areMarkersVisible
            ? locations.map((location, index) => (
                <Marker
                  key={index}
                  icon={markerIcon}
                  position={[location.Latitude, location.Longitude]}
                ></Marker>
              ))
            : null}
        </FeatureGroup>
      </Map>
      <div id='controls'>
        <div className='left'>
          <Dragger
            name='file'
            onChange={(event) => fileUploadHandler(event)}
            beforeUpload={() => false}
            accept='.csv'
            fileList={fileList}
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
        <div className='right'>
          <Space>
            <Button
              type='primary'
              disabled={!isTableDataPresent ? true : false}
              onClick={() => toggleTableVisibility()}
            >
              {isTableVisible ? 'Hide' : 'Show'} table
            </Button>
            <Button
              type='primary'
              onClick={() => toggleMarkersVisibility()}
              disabled={!isTableDataPresent ? true : false}
            >
              Display markers
            </Button>
            <Button type='primary' disabled={!isTableDataPresent ? true : false}>
              Create Route
            </Button>
          </Space>

          {isTableVisible && isTableDataPresent ? (
            <Table columns={tableColumns} dataSource={tableData} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;
