import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  useMapEvents,
  useMap,
} from "react-leaflet";

import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

const SetMarkerLocation = ({ polygonPoints, setSelectedLocation }) => {
  useMapEvents({
    click: (clickEvent) => {
      if (
        getIsPointInsidePolygon(
          [clickEvent.latlng.lat, clickEvent.latlng.lng],
          polygonPoints
        )
      ) {
        setSelectedLocation([clickEvent.latlng.lat, clickEvent.latlng.lng]);
      }
    },
  });

  return null;
};

const getIsPointInsidePolygon = (point, vertices) => {
  const x = point[0];
  const y = point[1];

  let inside = false;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const xi = vertices[i][0],
      yi = vertices[i][1];
    const xj = vertices[j][0],
      yj = vertices[j][1];

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
};

const MarkerMap = ({
  site,
  equipmentName,
  selectedLocation,
  setSelectedLocation,
}) => {
  const createMarkerIcon = (color) => {
    return L.icon({
      iconUrl: `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${color.slice(
        1
      )}&chf=a,s,ee00FFFF`,
      shadowUrl: markerShadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      shadowSize: [41, 41],
    });
  };

  const ResetsCenterView = ({ selectedSitePolygon }) => {
    const map = useMap();

    useEffect(() => {
      if (selectedSitePolygon) {
        let sumLat = 0;
        let sumLon = 0;

        selectedSitePolygon.forEach(([lat, lon]) => {
          sumLat += lat;
          sumLon += lon;
        });

        const avgLat = sumLat / selectedSitePolygon.length;
        const avgLon = sumLon / selectedSitePolygon.length;
        const avgPoint = [avgLat, avgLon];

        map.flyTo(avgPoint, 17, {
          animate: true,
        });
      }
    }, [selectedSitePolygon]);
    return null;
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

      {selectedLocation && (
        <Marker
          position={selectedLocation}
          icon={site ? createMarkerIcon(site.siteColor) : null}
        >
          <Popup>{equipmentName}</Popup>
        </Marker>
      )}

      {site && (
        <>
          <Polygon
            pathOptions={{ color: site.siteColor }}
            positions={site.sitePolygonPoints}
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

          <SetMarkerLocation
            polygonPoints={site.sitePolygonPoints}
            setSelectedLocation={setSelectedLocation}
          />
          <ResetsCenterView selectedSitePolygon={site.sitePolygonPoints} />
        </>
      )}
    </MapContainer>
  );
};

export default MarkerMap;
