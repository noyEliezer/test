import { Button, Modal, TextField, Alert, AlertTitle } from "@mui/material";
import React, { useState } from "react";
import { SketchPicker } from "react-color";
import DrawableMap from "../../components/drawableMap/DrawableMap";
import "./NewSite.css";

const NewSite = ({ sites, open, onClose, onSave }) => {
  const [siteName, setSiteName] = useState("");
  const [siteDescription, setSiteDescription] = useState("");
  const [sitePolygonPoints, setSitePolygonPoints] = useState([]);
  const [siteColor, setSiteColor] = useState("#ff0000");
  const [isDuplicatedSiteName, setIsDuplicatedSiteName] = useState(false);

  const handleSiteNameChange = (event) => {
    const newName = event.target.value;
    setSiteName(newName);
    setIsDuplicatedSiteName(
      sites.some((site) => site.siteName === newName.trim())
    );
  };

  const handleSiteDescriptionChange = (event) => {
    setSiteDescription(event.target.value);
  };

  const handleSave = () => {
    const newSite = {
      siteName: siteName.trim(),
      siteDescription,
      sitePolygonPoints,
      siteMarkers: [],
      siteColor,
    };
    onSave(newSite);
    onClose();
    console.log("save site", newSite);
  };

  const addPoint = (lat, lng) => {
    setSitePolygonPoints([...sitePolygonPoints, [lat, lng]]);
  };

  const removePoint = () => {
    setSitePolygonPoints(sitePolygonPoints.slice(0, -1));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="new-site-modal-container">
        <div className="new-site-modal-form">
          <h2>New Site</h2>
          <div className="new-site-form-body">
            <TextField
              label="Site Name"
              value={siteName}
              onChange={handleSiteNameChange}
            />
            <TextField
              label="Site Description"
              value={siteDescription}
              onChange={handleSiteDescriptionChange}
              multiline
            />
            <SketchPicker
              color={siteColor}
              onChange={(color) => setSiteColor(color.hex)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              className="new-site-form-button"
              disabled={
                !siteName ||
                !siteDescription ||
                sitePolygonPoints.length < 3 ||
                isDuplicatedSiteName
              }
            >
              Save
            </Button>
          </div>
          {isDuplicatedSiteName && (
            <div className="alert-container">
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                The site name already exists. Please choose a different name.
              </Alert>
            </div>
          )}
        </div>
        <div className="new-site-modal-map">
          <DrawableMap
            polygon={sitePolygonPoints}
            addPoint={addPoint}
            removePoint={removePoint}
            siteColor={siteColor}
          />
        </div>
      </div>
    </Modal>
  );
};

export default NewSite;
