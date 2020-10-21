export const addCircle = (center, radius, map) => {
  var circle = new H.map.Circle(center, radius);
  map.addObject(circle);
};

export const addPolyLine = (points, map) => {
  // Initialize a linestring and add all the points to it:
  var linestring = new H.geo.LineString();
  points.forEach(function (point) {
    linestring.pushPoint(point);
  });

  // Initialize a polyline with the linestring:
  var polyline = new H.map.Polyline(linestring, { style: { lineWidth: 10 } });

  // Add the polyline to the map:
  map.addObject(polyline);

  // Zoom the map to fit the rectangle:
  map.getViewModel().setLookAtData({ bounds: polyline.getBoundingBox() });
};
