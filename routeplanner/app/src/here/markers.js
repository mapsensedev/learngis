export const addDraggableMarker = (behavior, center, map) => {
  const marker = new H.map.Marker(center, { volatility: true });
  marker.draggable = true;
  map.addObject(marker);

  // Add event listeners for marker movement
  map.addEventListener(
    'dragstart',
    (evt) => {
      if (evt.target instanceof H.map.Marker) behavior.disable();
    },
    false
  );

  map.addEventListener(
    'drag',
    (evt) => {
      const pointer = evt.currentPointer;
      if (evt.target instanceof H.map.Marker) {
        evt.target.setGeometry(map.screenToGeo(pointer.viewportX, pointer.viewportY));
      }
    },
    false
  );

  map.addEventListener(
    'dragend',
    (evt) => {
      if (evt.target instanceof H.map.Marker) {
        behavior.enable();
      }
    },
    false
  );
};
