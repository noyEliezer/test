import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import React from "react";
import {
  CircleMarker,
  MapContainer,
  Polygon,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "./DrawableMap.css";

const DrawableMap = ({ onSave, polygon, addPoint, removePoint, siteColor }) => {
  const handleMapClick = (event) => {
    const { latlng, originalEvent } = event;
    const { lat, lng } = latlng;
    const target = originalEvent.target;
    const isButtonClicked =
      target.classList.contains("back-polygon") ||
      target.classList.contains("MuiSvgIcon-root");

    if (!isButtonClicked) addPoint(lat, lng);
    else {
      if (!target.classList.contains("back-polygon")) {
        event.originalEvent.stopPropagation();
        removePoint();
      }
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  const cornerPointOptions = {
    fillColor: siteColor,
    color: siteColor,
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
      <MapClickHandler />

      {polygon.length > 0 && (
        <div onClick={() => removePoint()} className="back-polygon">
          <UndoOutlinedIcon />
        </div>
      )}

      {polygon.length > 0 && (
        <PolygonWithCornerPoints
          positions={polygon}
          cornerPointOptions={cornerPointOptions}
          siteColor={siteColor}
        />
      )}
    </MapContainer>
  );
};

const PolygonWithCornerPoints = ({
  positions,
  cornerPointOptions,
  siteColor,
}) => {
  return (
    <>
      <Polygon
        positions={positions}
        pathOptions={{ fillColor: siteColor, color: siteColor }}
      />
      {positions.map(([lat, lng], index) => (
        <CircleMarker
          key={index}
          center={[lat, lng]}
          pathOptions={cornerPointOptions}
        />
      ))}
    </>
  );
};

export default DrawableMap;
