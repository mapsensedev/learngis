import L from 'leaflet';
import 'leaflet.polyline.snakeanim/L.Polyline.SnakeAnim.js';

import React, { useState, useEffect, useRef } from 'react';
import { Map, TileLayer, FeatureGroup, Polyline, Marker } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import { points, feature } from '@turf/helpers';
import pointsWithinPolygon from '@turf/points-within-polygon';

import { Button, Space, Upload, Table, Affix } from 'antd';
import { InboxOutlined, PlusCircleFilled } from '@ant-design/icons';

import PolylineSnake from '../components/polyline-snake/PolylineSnake';

import { unparse } from 'papaparse';
import { csvToJson } from '../helpers/parser';
import { getRoute } from '../helpers/hereapi';

import './app.scss';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet.awesome-markers';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'antd/dist/antd.css';

const { Dragger } = Upload;

const numberedIcon = (label) => {
  return L.divIcon({
    html: `
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
            <circle cx="25" cy="25" r="25" fill="#000000" />
            <text x="50%" y="50%" text-anchor="middle" fill="white" font-size="25px" dy=".3em">${label}</text>
        </svg>
    `.trim(),
    className: '',
  });
};

const App = () => {
  const [viewport, setViewport] = useState({
    center: [39.66385, -75.56709],
    zoom: 9,
  });

  const [mapBounds, setMapBounds] = useState([]);
  const [waypoints, setWaypoints] = useState([]);
  const [selectedWaypoints, setSelectedWaypoints] = useState([]);
  const [wayPointsLoading, setwayPointsLoading] = useState(false);
  const [selectedWayPointsLoading, setSelectedWayPointsLoading] = useState(false);

  const [file, setFile] = useState({});
  const [fileList, setFileList] = useState([]);

  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [allPoints, setAllPoints] = useState({});
  const [selectedPoints, setSelectedPoints] = useState({});

  const [isTableDataPresent, setIsTableDataPresent] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  // const [isTableDataPresent, setIsTableDataPresent] = useState(false);
  // const [isTableVisible, setIsTableVisible] = useState(false);
  // const [tableColumns, setTableColumns] = useState([]);
  // const [tableData, setTableData] = useState([]);

  const [areMarkersVisible, setAreMarkersVisible] = useState(false);
  const [isRouteVisible, setIsRouteVisible] = useState(false);
  const [isSelectedRouteVisible, setIsSelectedRouteVisible] = useState(false);

  const mapRef = useRef();

  useEffect(() => {
    populateTable(locations);

    if (locations.length > 0) {
      loadRoute(locations);

      let pointsFromLocations = [];

      locations.forEach((location) => {
        pointsFromLocations.push([location.Longitude, location.Latitude]);
      });

      setAllPoints(points(pointsFromLocations));
    }
  }, [locations]);

  useEffect(() => {
    if (selectedLocations.length > 0) {
      loadSelectedRoute(selectedLocations);
    }
  }, [selectedLocations]);

  useEffect(() => {
    if (!(Object.keys(selectedPoints).length === 0 && selectedPoints.constructor === Object)) {
      let intersectArray = [];

      let selectedPointsString = JSON.stringify(selectedPoints.features);

      locations.forEach((location) => {
        let geometryL = {
          type: 'Point',
          coordinates: [location.Longitude, location.Latitude],
        };

        let featureL = JSON.stringify(feature(geometryL));

        if (selectedPointsString.includes(featureL)) {
          intersectArray.push(location);
        }
      });

      setSelectedLocations(intersectArray);
    }
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

  async function loadRoute(locations) {
    setwayPointsLoading(true);
    let route = await getRoute(locations);
    setWaypoints(route);
    setwayPointsLoading(false);
  }

  async function loadSelectedRoute(locations) {
    setSelectedWayPointsLoading(true);
    let route = await getRoute(locations);
    setSelectedWaypoints(route);
    setSelectedWayPointsLoading(false);
  }

  function shapeDrawHandler(event) {
    setSelectedPoints(pointsWithinPolygon(allPoints, event.layer.toGeoJSON()));
  }

  function shapeEditHandler(event) {
    // console.log(event);
  }

  function fileUploadHandler(event) {
    let fileList = [...event.fileList];
    fileList = fileList.slice(-1);
    setFileList(fileList);
  }

  function fileDownloadHandler() {
    let text = unparse(selectedLocations);

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'routes.csv');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
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
  function toggleSelectedRouteVisibility() {
    if (isSelectedRouteVisible) {
      setIsSelectedRouteVisible(false);
    } else {
      setIsSelectedRouteVisible(true);
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
                icon={numberedIcon(index)}
                position={[location.Latitude, location.Longitude]}
              ></Marker>
            ))}
          </FeatureGroup>
        )}

        {/* {isRouteVisible && (
            <Polyline
              color='blue'
              positions={waypoints}
              onadd={(e) => mapBoundsHandler(e)}
            />
          )} */}
        {isRouteVisible ? <PolylineSnake waypoints={waypoints} trigger={isRouteVisible} /> : null}
        {isSelectedRouteVisible && (
          <Polyline
            color='green'
            onadd={(e) => mapBoundsHandler(e)}
            positions={selectedWaypoints}
          />
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
              disabled={isTableDataPresent ? false : true}
              onClick={() => toggleTableVisibility()}
            >
              {isTableVisible ? 'Hide' : 'Show'} complete table
            </Button>
            <Button
              type='primary'
              onClick={() => toggleMarkersVisibility()}
              disabled={isTableDataPresent ? false : true}
            >
              {areMarkersVisible ? 'Hide' : 'Display'} markers
            </Button>
            {/* <Button
              type='primary'
              onClick={() => toggleRouteVisibility()}
              disabled={isTableDataPresent ? false : true}
              loading={wayPointsLoading}
            >
              {isRouteVisible ? 'Hide' : 'Show'} complete route
            </Button> */}
            <Button
              type='primary'
              onClick={() => toggleRouteVisibility()}
              disabled={isTableDataPresent ? false : true}
              loading={wayPointsLoading}
            >
              Draw route
            </Button>
            <Button
              type='primary'
              disabled={isTableDataPresent ? false : true}
              onClick={() => toggleTableVisibility()}
            >
              {isTableVisible ? 'Hide' : 'Show'} selected table
            </Button>
            <Button
              type='primary'
              onClick={() => toggleSelectedRouteVisibility()}
              disabled={isTableDataPresent ? false : true}
              loading={selectedWayPointsLoading}
            >
              {isSelectedRouteVisible ? 'Hide' : 'Show'} selected route
            </Button>
            <Button type='primary' onClick={() => fileDownloadHandler()}>
              Download Routes
            </Button>
          </Space>

          {isTableVisible && isTableDataPresent ? (
            <Table columns={tableColumns} dataSource={tableData} />
          ) : null}
        </div>
      </div>
      {/* <Affix style={{ position: 'absolute', bottom: 60, right: 60 }}>
        <Button
          type='text'
          shape='circle'
          icon={<PlusCircleFilled style={{ fontSize: '42px', color: '#1890ff' }} />}
        />
      </Affix> */}
    </div>
  );
};

export default App;
