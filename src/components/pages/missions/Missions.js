import * as React from 'react';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import missionsJson from './missions.json';
import Mission from './Mission';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TextRotateVerticalIcon from '@mui/icons-material/TextRotateVertical';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import './Missions.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Missions = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [editMissionClicked, setEditMissionClicked] = useState(false);
  const [sortingOrderDate, setSortingOrderDate] = useState('asc');
  const [sortingOrderAlph, setSortingOrderAlph] = useState('asc');
  const [sortingOrderCity, setSortingOrderCity] = useState('asc');
  const [sortingOrderUrg, setSortingOrderUrg] = useState('asc');

  const [filter, setFilter] = useState('created_date');

  const handleFilter = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  // sort asc or desc by clicking on filter
  const sortingHandlerDate = () => {
    if (sortingOrderDate === 'asc') {
      setSortingOrderDate('desc');
    } else if (sortingOrderDate === 'desc') {
      setSortingOrderDate('asc');
    }
  };
  const sortingHandlerAlph = () => {
    if (sortingOrderAlph === 'asc') {
      setSortingOrderAlph('desc');
    } else if (sortingOrderAlph === 'desc') {
      setSortingOrderAlph('asc');
    }
  };
  const sortingHandlerCity = () => {
    if (sortingOrderCity === 'asc') {
      setSortingOrderCity('desc');
    } else if (sortingOrderCity === 'desc') {
      setSortingOrderCity('asc');
    }
  };
  const sortingHandlerUrg = () => {
    if (sortingOrderUrg === 'asc') {
      setSortingOrderUrg('desc');
    } else if (sortingOrderUrg === 'desc') {
      setSortingOrderUrg('asc');
    }
  };

  // set filter

  let filteredMissions = missionsJson;

  if (filter === 'abc' && sortingOrderAlph === 'asc') {
    filteredMissions = filteredMissions.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else if (filter === 'abc' && sortingOrderAlph === 'desc') {
    filteredMissions = filteredMissions.sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  }
  if (filter === 'city' && sortingOrderCity === 'asc') {
    filteredMissions = filteredMissions.sort((a, b) =>
      a.city.localeCompare(b.city)
    );
  } else if (filter === 'city' && sortingOrderCity === 'desc') {
    filteredMissions = filteredMissions.sort((a, b) =>
      b.city.localeCompare(a.city)
    );
  }
  if (filter === 'created_date' && sortingOrderDate === 'asc') {
    filteredMissions = filteredMissions.sort((a, b) =>
      a.created_date.localeCompare(b.created_date)
    );
  } else if (filter === 'created_date' && sortingOrderDate === 'desc') {
    filteredMissions = filteredMissions.sort((a, b) =>
      b.created_date.localeCompare(a.created_date)
    );
  }

  const urgencyValues = {
    High: 3,
    Medium: 2,
    Low: 1,
  };
  if (filter === 'urgency' && sortingOrderUrg === 'asc') {
    filteredMissions = filteredMissions.sort(
      (a, b) => urgencyValues[b.urgency] - urgencyValues[a.urgency]
    );
  } else if (filter === 'urgency' && sortingOrderUrg === 'desc') {
    filteredMissions = filteredMissions.sort(
      (a, b) => urgencyValues[a.urgency] - urgencyValues[b.urgency]
    );
  }

  //------------------------------

  const saveHandler = () => {
    setOpenDialog(!openDialog);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenDialog(false);
    setOpenSuccess(false);
  };

  const handleCloseSaved = () => {
    setOpenSuccess(true);
    setOpenDialog(false);
  };

  const editMissionHandler = () => {
    setEditMissionClicked((prevState) => {
      return (prevState = !prevState);
    });
  };

  const editMissionClickedClass = editMissionClicked ? 'info' : 'white';

  return (
    <div className="MissionsTableBox">
      <div className="MissionsBtnsBox">
        <div className="Welcome">
          Welcome Admin, Total missions: {missionsJson.length}
        </div>
        <div className="filtersBtns">
          <div className="actionBtns">
            <Link className="newMission" to={`/missions/newMission`}>
              <Fab size="small" color="white" aria-label="add">
                <AddIcon />
              </Fab>
            </Link>
            <Fab
              size="small"
              color={editMissionClickedClass}
              aria-label="add"
              onClick={editMissionHandler}
            >
              <EditIcon />
            </Fab>
            <Fab size="small" color="white" aria-label="add">
              <DeleteIcon />
            </Fab>
          </div>
          <ToggleButtonGroup
            value={filter}
            exclusive
            required
            onChange={handleFilter}
            aria-label="set filter"
          >
            <ToggleButton
              value="created_date"
              aria-label="filter by city"
              onClick={sortingHandlerDate}
            >
              <CalendarMonthIcon />
            </ToggleButton>
            <ToggleButton
              value="abc"
              aria-label="filter alphabetically"
              onClick={sortingHandlerAlph}
            >
              <TextRotateVerticalIcon />
            </ToggleButton>
            <ToggleButton
              value="city"
              aria-label="filter by city"
              onClick={sortingHandlerCity}
            >
              <LocationCityIcon />
            </ToggleButton>
            <ToggleButton
              value="urgency"
              aria-label="filter by urgency"
              onClick={sortingHandlerUrg}
            >
              <PriorityHighIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <Button
            style={{ marginLeft: '1.2rem' }}
            variant="contained"
            onClick={saveHandler}
          >
            Save
          </Button>
          <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Saving your missions'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you would like to save?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleCloseSaved} autoFocus>
                Save
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={openSuccess}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: '100%' }}
            >
              Your missions were successfully saved!
            </Alert>
          </Snackbar>
        </div>
      </div>
      <div className="MissionsTable">
        <ul className="Missions">
          {filteredMissions.map((mission) => (
            <Mission
              key={mission.id}
              mission={mission}
              editMissionClicked={editMissionClicked}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Missions;
