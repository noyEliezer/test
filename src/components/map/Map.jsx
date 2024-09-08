import L from "leaflet";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";
import React from "react";
import {
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer
} from "react-leaflet";

const Map = ({ sites }) => {
  const createMarkerIcon = (color) => {

    return L.icon({
      iconUrl: `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${color.slice(1)}&chf=a,s,ee00FFFF`,
      shadowUrl: markerShadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      shadowSize: [41, 41],
    });
  };

  return (
    <MapContainer
      center={[32.020167, 34.77118]}
      zoom={16}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {sites?.map((site) => (
        <Polygon
          positions={site.sitePolygonPoints}
          color={site.siteColor}
          key={site.siteName}
        >
          {site.siteMarkers.map((marker) => (
            <Marker
              position={marker.markerPoints}
              key={marker.markerName}
              icon={createMarkerIcon(site.siteColor)}
            >
              <Popup>{marker.markerName}</Popup>
            </Marker>
          ))}
        </Polygon>
      ))}
    </MapContainer>
  );
};

export default Map;
