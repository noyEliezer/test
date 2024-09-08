import React, { useEffect, useState } from "react";
import NewSite from "../../../forms/NewSite/NewSite";
import Map from "../../map/Map";
import "./ManagementMap.css";

import ConstructionIcon from "@mui/icons-material/Construction";
import PolylineIcon from "@mui/icons-material/Polyline";
import { Fab } from "@mui/material";
import NewEquipment from "../../../forms/NewEquipment/NewEquipment";

const ManagementMap = () => {
  const [sites, setSites] = useState([]);
  const [isNewSiteFormOpen, setIsNewSiteFormOpen] = useState(false);
  const [isNewEquipmentFormOpen, setIsNewEquipmentFormOpen] = useState(false);

  // useEffect(() => {
  //   const mockSites = [
  //     {
  //       siteName: "Site 1",
  //       siteDescription: "Description for Site 1",
  //       sitePolygonPoints: [
  //         [32.0231, 34.7749],
  //         [32.0223, 34.7801],
  //         [32.0184, 34.7797],
  //         [32.0186, 34.7733],
  //       ],
  //       siteMarkers: [
  //         {
  //           markerName: "Marker 1",
  //           markerPoints: [32.0212, 34.7776],
  //         },
  //         {
  //           markerName: "Marker 2",
  //           markerPoints: [32.0202, 34.7753],
  //         },
  //       ],
  //       siteColor: "#741af3",
  //     },
  //     {
  //       siteName: "Site 2",
  //       siteDescription: "Description for Site 2",
  //       sitePolygonPoints: [
  //         [32.0225, 34.7648],
  //         [32.0211, 34.7676],
  //         [32.0194, 34.7659],
  //         [32.0209, 34.763],
  //       ],
  //       siteMarkers: [
  //         {
  //           markerName: "Marker 3",
  //           markerPoints: [32.021, 34.766],
  //         },
  //       ],
  //       siteColor: "#ddba2b",
  //     },
  //   ];

  //   setSites(mockSites);
  // }, []);

  const openNewSiteForm = () => {
    setIsNewSiteFormOpen(true);
  };

  const closeNewSiteForm = () => {
    setIsNewSiteFormOpen(false);
  };

  const openNewEquipmentForm = () => {
    setIsNewEquipmentFormOpen(true);
  };

  const closeNewEquipmentForm = () => {
    setIsNewEquipmentFormOpen(false);
  };

  const handleSaveNewSite = (newSiteData) => {
    console.log("New Site Data:", newSiteData);
    setSites((prevSites) => [...prevSites, newSiteData]);
  };

  const handleSaveNewEquipment = (newEquipmentData) => {
    console.log("New Equipment Data:", newEquipmentData);

    const updatedSites = sites.map((site) => {
      if (site.siteName === newEquipmentData.selectedSite) {
        const newMarker = {
          markerName: newEquipmentData.equipmentName,
          markerPoints: newEquipmentData.selectedLocation,
        };
        const updatedSiteMarkers = [...site.siteMarkers, newMarker];
        return {
          ...site,
          siteMarkers: updatedSiteMarkers,
        };
      }
      return site;
    });

    setSites(updatedSites);
  };

  return (
    <div className="task-container">
      <Map sites={sites} />
      <div className="floating-actions">
        <Fab color="primary" aria-label="add" onClick={openNewSiteForm}>
          <PolylineIcon />
        </Fab>
        <Fab color="secondary" aria-label="edit" onClick={openNewEquipmentForm}>
          <ConstructionIcon />
        </Fab>
      </div>
      <NewSite
        sites={sites}
        open={isNewSiteFormOpen}
        onClose={closeNewSiteForm}
        onSave={handleSaveNewSite}
      />
      <NewEquipment
        open={isNewEquipmentFormOpen}
        onClose={closeNewEquipmentForm}
        onSave={handleSaveNewEquipment}
        sites={sites}
      />
    </div>
  );
};

export default ManagementMap;
