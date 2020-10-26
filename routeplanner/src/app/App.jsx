import L from 'leaflet';
import React, { useState, useEffect, useRef } from 'react';
import { Map, TileLayer, Marker, FeatureGroup, Polyline } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import { points } from '@turf/helpers';
import pointsWithinPolygon from '@turf/points-within-polygon';

import { Button, Space, Upload, Table } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { csvToJson } from '../helpers/parser';
import { getRoute } from '../helpers/getRoute';

import './app.scss';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet.awesome-markers';
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

  const [mapBounds, setMapBounds] = useState([]);
  const [waypoints, setWaypoints] = useState([]);

  const [file, setFile] = useState({});
  const [fileList, setFileList] = useState([]);

  const [locations, setLocations] = useState([]);

  const [allPoints, setAllPoints] = useState({});
  const [selectedPoints, setSelectedPoints] = useState([]);

  const [isTableDataPresent, setIsTableDataPresent] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [areMarkersVisible, setAreMarkersVisible] = useState(false);
  const [isRouteVisible, setIsRouteVisible] = useState(false);

  const mapRef = useRef();

  useEffect(() => {
    populateTable(locations);

    if (locations.length > 0) {
      loadRoute();

      let pointsFromLocations = [];

      locations.forEach((location) => {
        pointsFromLocations.push([location.Longitude, location.Latitude]);
      });

      setAllPoints(points(pointsFromLocations));
    }
  }, [locations]);

  useEffect(() => {
    console.log(allPoints);
  }, [allPoints]);

  useEffect(() => {
    console.log(selectedPoints);
  }, [selectedPoints]);

  useEffect(() => {
    const map = mapRef.current.leafletElement;

    if (!(Object.keys(file).length === 0 && file.constructor === Object)) {
      if (map.getBounds() !== mapBounds) {
        map.flyToBounds(mapBounds);
      }
    }
  }, [mapBounds]);

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

  async function loadRoute() {
    let route = await getRoute(locations);
    setWaypoints(route);
  }

  function shapeDrawHandler(event) {
    let layer = event.layer;

    setSelectedPoints(pointsWithinPolygon(allPoints, layer.toGeoJSON()));
  }

  function shapeEditHandler(event) {
    console.log(event);
  }

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
    }
  }

  function toggleRouteVisibility() {
    if (isRouteVisible) {
      setIsRouteVisible(false);
    } else {
      setIsRouteVisible(true);
    }
  }

  function mapBoundsHandler(e) {
    try {
      const { _northEast, _southWest } = e.target.getBounds();
      setMapBounds([
        [_northEast.lat, _northEast.lng],
        [_southWest.lat, _southWest.lng],
      ]);
    } catch (error) {
      console.log(error);
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
        <FeatureGroup>
          <EditControl
            position='topright'
            draw={{
              rectangle: true,
              polygon: true,
              polyline: false,
              circle: false,
              marker: false,
              circlemarker: false,
            }}
            onCreated={(e) => shapeDrawHandler(e)}
            onEdited={(e) => shapeEditHandler(e)}
          />
        </FeatureGroup>
        {areMarkersVisible && (
          <FeatureGroup onadd={(e) => mapBoundsHandler(e)}>
            {locations.map((location, index) => (
              <Marker
                key={index}
                icon={markerIcon}
                position={[location.Latitude, location.Longitude]}
              ></Marker>
            ))}
          </FeatureGroup>
        )}
        {isRouteVisible && (
          <Polyline color='blue' onadd={(e) => mapBoundsHandler(e)} positions={waypoints} />
        )}
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
              {areMarkersVisible ? 'Hide' : 'Display'} markers
            </Button>
            <Button
              type='primary'
              onClick={() => toggleRouteVisibility()}
              disabled={!isTableDataPresent ? true : false}
            >
              {isRouteVisible ? 'Hide' : 'Show'} routes
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
