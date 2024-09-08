import { useState } from 'react';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import NextWeekIcon from '@mui/icons-material/NextWeek';
import WorkerSelector from './WorkerSelector';
import Checkbox from '@mui/material/Checkbox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';

const Mission = (props) => {
  const [showDescription, setShowDescription] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const label = { inputProps: { 'aria-label': 'Mission Checkbox' } };
  const navigate = useNavigate();

  const formattedDate = new Date().getTime(); // Get the current date in milliseconds
  const missionCreatedDate = new Date(props.mission.created_date).getTime(); // Get the mission's created date in milliseconds
  // Calculate the number of days left
  const pastDays =
    Math.round((formattedDate - missionCreatedDate) / (1000 * 60 * 60 * 24)) <
    9999
      ? Math.round((formattedDate - missionCreatedDate) / (1000 * 60 * 60 * 24))
      : '...';

  const arrowClass = showDescription ? 'expansionArrow' : 'expansionArrowUp';
  const toggleDescription = (event) => {
    setShowDescription(!showDescription);
    event.stopPropagation();
  };

  const missionChangeHandler = () => {
    if (props.editMissionClicked)
      navigate(`/missions/edit/${props.mission.id}`);
  };

  const checkBoxHandler = (event) => {
    event.stopPropagation();
    setIsDone((prevState) => !prevState);
  };

  const UrgencyClass =
    props.mission.urgency === 'High'
      ? 'UrgencyHigh'
      : props.mission.urgency === 'Medium'
      ? 'UrgencyMed'
      : props.mission.urgency === 'Low'
      ? 'UrgencyLow'
      : 'Urgency';

  return (
    <li
      key={props.mission.id}
      className={`MissionlistItem ${isDone ? 'done' : ''}`}
    >
      <div className="MissionlistItemContent">
        <Checkbox
          {...label}
          sx={{
            color: 'white',
            '&.Mui-checked': {
              color: 'white',
            },
          }}
          onClick={checkBoxHandler}
        />
        <label className="MissionLabel">
          <div className="MissionContent">
            <div className="missionTitle">
              <span
                className="MissionName"
                style={{ fontSize: '1.2rem', color: '#fff' }}
                onClick={missionChangeHandler}
              >
                {props.mission.title}
              </span>
              <div className={arrowClass} onClick={toggleDescription}>
                <KeyboardArrowDownIcon />
              </div>
            </div>
            <div className="filters" onClick={missionChangeHandler}>
              <div className="filterContent">
                <span className="filterTitle">Urgency:</span>
                <span
                  className={UrgencyClass}
                  style={{ fontSize: '1rem', color: '#fff' }}
                >
                  {props.mission.urgency}
                </span>
              </div>
              <div className="filterContent">
                <span className="filterTitle">City:</span>
                <span
                  className="City"
                  style={{ fontSize: '1rem', color: '#fff' }}
                >
                  {props.mission.city}
                </span>
              </div>
              <div className="filterContent">
                <span className="filterTitle">Area:</span>
                <span
                  className="Area"
                  style={{ fontSize: '1rem', color: '#fff' }}
                >
                  {props.mission.area}
                </span>
              </div>
              <div className="filterContent">
                <span className="filterTitle">Date:</span>
                <span
                  className="Date"
                  style={{ fontSize: '1rem', color: '#fff' }}
                >
                  {props.mission.created_date}
                </span>
              </div>
              <div className="filterContentPastDays">
                <span className="filterTitle">Past Days:</span>
                <span
                  className="PastDays"
                  style={{ fontSize: '1rem', color: '#fff' }}
                >
                  {pastDays}
                </span>
              </div>
            </div>
          </div>
          <WorkerSelector />
          <Link
            className="taskBtn"
            to={`/task/mission/${props.mission.id}`}
            onClick={checkBoxHandler}
          >
            <Fab size="small" color="info" aria-label="add">
              <NextWeekIcon />
            </Fab>
          </Link>
        </label>
      </div>
      {showDescription && (
        <div className="missionDesc">{props.mission.description}</div>
      )}
    </li>
  );
};

export default Mission;
