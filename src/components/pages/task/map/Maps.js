import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
  Circle,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = L.icon({
  iconUrl: `${window.location.origin}/placeholder.png`,
  iconSize: [38, 38],
  shadowUrl: `${window.location.origin}/marker-shadow.png`,
  shadowSize: [38, 38],
  shadowAnchor: [10, 18],
});

const position = [51.505, -0.09];
const position2 = [32.1098, 34.8382];
const NOMINATIM_REVERSE_URL = 'https://nominatim.openstreetmap.org/reverse';

// ------------------------------------------------------

function ResetsCenterView(props) {
  const { selectedPosition } = props;
  const map = useMap();

  useEffect(() => {
    // console.log(selectedPosition?.lat, selectedPosition?.lon);
    if (selectedPosition) {
      map.flyTo(L.latLng(selectedPosition?.lat, selectedPosition?.lon), 17, {
        animate: true,
      });
      props.setUpdatedLocation(
        L.latLng(selectedPosition?.lat, selectedPosition?.lon)
      );
    }
  }, [selectedPosition]);

  return null;
}

// ------------------------------------------------------

const LocationMarker = (props) => {
  const fetchCurrentInfo = (latlng) => {
    const params = {
      format: 'json',
      lat: latlng.lat,
      lon: latlng.lng,
      zoom: 18,
    };

    const queryString = new URLSearchParams(params).toString();

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(`${NOMINATIM_REVERSE_URL}?${queryString}`, requestOptions)
      .then((res) => res.text())
      .then((res) => {
        props.setLocationName(JSON.parse(res).display_name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      props.setUpdatedLocation(e.latlng);
      map.flyTo(e.latlng, 17);
      fetchCurrentInfo(e.latlng);

      //checks if location 2 in radius to current location
      isMarkerInsideCircle(L.latLng(position2), L.latLng(e.latlng), 100);
    },
  });

  return null;
};

const isMarkerInsideCircle = (
  markerLatLng,
  circleCenterLatLng,
  circleRadius
) => {
  // markerLatLng and circleCenterLatLng must be instance of L.latlng class.
  // you can create an instance like this L.latLng(lat, lng);
  if (markerLatLng.distanceTo(circleCenterLatLng) <= circleRadius) {
    console.log('true');
    return true;
  } else {
    console.log('false');
    return false;
  }
};

// ------------------------------------------------------

export default function Maps(props) {
  const [updatedLocation, setUpdatedLocation] = useState(position);

  return (
    <MapContainer
      center={{ lat: 32.0853, lng: 34.781769 }}
      zoom={11}
      scrollWheelZoom={true}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={updatedLocation} icon={icon}>
        <Popup>{props.locationName}</Popup>
      </Marker>
      <Marker position={position2} icon={icon}>
        <Popup>location2</Popup>
      </Marker>
      <Circle
        center={updatedLocation}
        pathOptions={{ fillColor: 'blue' }}
        radius={100}
      />
      <LocationMarker
        updatedLocation={updatedLocation}
        setUpdatedLocation={setUpdatedLocation}
        setLocationName={props.setLocationName}
      />
      <ResetsCenterView
        selectedPosition={props.selectedPosition}
        setUpdatedLocation={setUpdatedLocation}
      />
    </MapContainer>
  );
}
