import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import MarkerMap from "../../components/markerMap/markerMap";
import "./NewEquipment.css";

const NewEquipment = ({ open, onClose, onSave, sites }) => {
  const [selectedSite, setSelectedSite] = useState("");
  const [equipmentName, setEquipmentName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    setSelectedSite("");
    setEquipmentName("");
    setSelectedLocation(null);
  }, [open]);

  const handleSelectedSiteChange = (event) => {
    setSelectedSite(event.target.value);
  };

  const handleEquipmentNameChange = (event) => {
    setEquipmentName(event.target.value);
  };

  const handleSave = () => {
    const newEquipment = {
      selectedSite,
      equipmentName,
      selectedLocation,
    };
    onSave(newEquipment);
    onClose();
    console.log("Save equipment:", newEquipment);
  };

  useEffect(() => {
    setSelectedLocation(null);
  }, [selectedSite]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="new-equipment-modal-container">
        <div className="new-equipment-modal-form">
          <h2>New Equipment Form</h2>
          <div className="new-equipment-form-body">
            <FormControl fullWidth>
              <InputLabel id="equipment-site-label">Site</InputLabel>
              <Select
                labelId="equipment-site-label"
                id="equipment-site"
                value={selectedSite}
                label="Equipment Site"
                onChange={handleSelectedSiteChange}
              >
                {sites.map((site) => (
                  <MenuItem key={site.siteName} value={site.siteName}>
                    {site.siteName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="equipment-name"
              label="Equipment Name"
              variant="outlined"
              value={equipmentName}
              onChange={handleEquipmentNameChange}
              fullWidth
            />
          </div>
          <Button
            variant="contained"
            onClick={handleSave}
            className="new-equipment-form-button"
            disabled={!selectedSite || !equipmentName || !selectedLocation}
          >
            Save Data
          </Button>
        </div>
        <div className="new-equipment-modal-map">
          <MarkerMap
            site={sites.find((site) => site.siteName === selectedSite)}
            equipmentName={equipmentName}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </div>
      </div>
    </Modal>
  );
};

export default NewEquipment;
