import React, { useState } from 'react';
import './Tasks.css';
import tasks from './tasks.json';
import PrevTasksTable from './PrevTasksTable';
import { useNavigate, Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import NumbersIcon from '@mui/icons-material/Numbers';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TextRotateVerticalIcon from '@mui/icons-material/TextRotateVertical';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Map from '../../map/Map';
import DeleteTaskModal from '../../../UI/DeleteTaskModal';
import Task from './Task';

const Tasks = () => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedTaskToDelete, setSelectedTaskToDelete] = useState(null);

  const [editTaskClicked, setEditTaskClicked] = useState(false);
  const [deleteTaskClicked, setDeleteTaskClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [locationName, setLocationName] = useState('');
  const [tasksSortingOrderDate, setTasksSortingOrderDate] = useState('asc');
  const [tasksSortingOrderAlph, setTasksSortingOrderAlph] = useState('asc');
  const [tasksSortingOrderSerial, setTasksSortingOrderSerial] = useState('asc');
  const [tasksSortingOrderStatus, setTasksSortingOrderStatus] =
    useState('desc');
  const [tasksState, setTasksState] = useState(
    tasks.map((task) => ({ ...task, isProblemOpen: false }))
  );

  const [filter, setFilter] = useState('status');
  const navigate = useNavigate();

  const handleFilter = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  // sort asc or desc by clicking on filter
  const sortingHandlerDate = () => {
    if (tasksSortingOrderDate === 'asc') {
      setTasksSortingOrderDate('desc');
    } else if (tasksSortingOrderDate === 'desc') {
      setTasksSortingOrderDate('asc');
    }
  };
  const sortingHandlerAlph = () => {
    if (tasksSortingOrderAlph === 'asc') {
      setTasksSortingOrderAlph('desc');
    } else if (tasksSortingOrderAlph === 'desc') {
      setTasksSortingOrderAlph('asc');
    }
  };
  const sortingHandlerSerial = () => {
    if (tasksSortingOrderSerial === 'asc') {
      setTasksSortingOrderSerial('desc');
    } else if (tasksSortingOrderSerial === 'desc') {
      setTasksSortingOrderSerial('asc');
    }
  };
  const sortingHandlerUrg = () => {
    if (tasksSortingOrderStatus === 'asc') {
      setTasksSortingOrderStatus('desc');
    } else if (tasksSortingOrderStatus === 'desc') {
      setTasksSortingOrderStatus('asc');
    }
  };

  // set filters

  let filteredTasks = tasksState;

  if (filter === 'abc' && tasksSortingOrderAlph === 'asc') {
    filteredTasks = tasksState.sort((a, b) =>
      a.problem.localeCompare(b.problem)
    );
  } else if (filter === 'abc' && tasksSortingOrderAlph === 'desc') {
    filteredTasks = tasksState.sort((a, b) =>
      b.problem.localeCompare(a.problem)
    );
  }
  if (filter === 'serial' && tasksSortingOrderSerial === 'asc') {
    filteredTasks = tasksState.sort((a, b) =>
      a.product_serial_number.localeCompare(b.product_serial_number)
    );
  } else if (filter === 'serial' && tasksSortingOrderSerial === 'desc') {
    filteredTasks = tasksState.sort((a, b) =>
      b.product_serial_number.localeCompare(a.product_serial_number)
    );
  }
  if (filter === 'date_updated' && tasksSortingOrderDate === 'asc') {
    filteredTasks = tasksState.sort((a, b) =>
      a.date_updated.localeCompare(b.date_updated)
    );
  } else if (filter === 'date_updated' && tasksSortingOrderDate === 'desc') {
    filteredTasks = tasksState.sort((a, b) =>
      b.date_updated.localeCompare(a.date_updated)
    );
  }

  const statusValues = {
    'In Progress': 1,
    Pending: 2,
    Finished: 3,
    Cancelled: 4,
  };
  if (filter === 'status' && tasksSortingOrderStatus === 'asc') {
    filteredTasks = tasksState.sort(
      (a, b) => statusValues[b.status] - statusValues[a.status]
    );
  } else if (filter === 'status' && tasksSortingOrderStatus === 'desc') {
    filteredTasks = tasksState.sort(
      (a, b) => statusValues[a.status] - statusValues[b.status]
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#ffa500';
      case 'In Progress':
        return '#1e90ff';
      case 'Finished':
        return '#008000';
      case 'Cancelled':
        return '#ff0000';
      default:
        return '#000';
    }
  };

  const taskClickedHandler = (task) => {
    if (!editTaskClicked && !deleteTaskClicked) {
      setSelectedPosition({
        lat: task?.location?.lat,
        lon: task?.location?.lon,
      });
    } else if (editTaskClicked && !deleteTaskClicked) {
      navigate(`${currentUrl}/edit/${task.task_id}`);
    } else if (deleteTaskClicked && !editTaskClicked) {
      setSelectedTaskToDelete(task);
      openModalHandler();
    }
  };

  const currentUrl = window.location.pathname;

  const fillTaskFormHandler = (task, event) => {
    event.stopPropagation();
    navigate(`${currentUrl}/fill/${task.task_id}`);
  };

  const editTaskHandler = () => {
    setEditTaskClicked((prevState) => {
      return (prevState = !prevState);
    });
    setDeleteTaskClicked(false);
  };

  const deleteTaskHandler = () => {
    setDeleteTaskClicked((prev) => {
      return (prev = !prev);
    });
    setEditTaskClicked(false);
  };

  const openModalHandler = () => {
    if (!isModalOpen) {
      document.querySelector('.backdrop').classList.add('show');
    }
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    if (isModalOpen) {
      document.querySelector('.backdrop').classList.remove('show');
    }
    setIsModalOpen(false);
  };

  const editTaskClickedClass = editTaskClicked ? 'info' : 'white';
  const deleteTaskClickedClass = deleteTaskClicked ? 'info' : 'white';

  return (
    <div className="taskPageBox">
      <DeleteTaskModal
        closeModal={closeModalHandler}
        selectedTaskToDelete={selectedTaskToDelete}
      />
      <div className="tasksList">
        <div className="taskListHeader">
          <div className="taskFilters">
            <ToggleButtonGroup
              value={filter}
              exclusive
              required
              onChange={handleFilter}
              aria-label="set filter"
            >
              <ToggleButton
                value="date_updated"
                aria-label="filter by date updated"
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
                value="serial"
                aria-label="filter by serial number"
                onClick={sortingHandlerSerial}
              >
                <NumbersIcon />
              </ToggleButton>
              <ToggleButton
                value="status"
                aria-label="filter by status"
                onClick={sortingHandlerUrg}
              >
                <PriorityHighIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className="actionBtns">
            <Fab
              size="small"
              color={deleteTaskClickedClass}
              aria-label="deleteTask"
              onClick={deleteTaskHandler}
            >
              <DeleteIcon />
            </Fab>
            <Fab
              size="small"
              color={editTaskClickedClass}
              aria-label="editTask"
              onClick={editTaskHandler}
            >
              <EditIcon />
            </Fab>
            <Link className="newMission" to={`${currentUrl}/addTask`}>
              <Fab size="small" color="white" aria-label="addTask">
                <AddIcon />
              </Fab>
            </Link>
          </div>
        </div>
        {filteredTasks.length > 0 && (
          <ul>
            {filteredTasks &&
              filteredTasks.map((task, index) => {
                return (
                  <Task
                    key={index}
                    taskClickedHandler={taskClickedHandler}
                    task={task}
                    fillTaskFormHandler={fillTaskFormHandler}
                    getStatusColor={getStatusColor}
                    filteredTasks={filteredTasks}
                    tasksState={tasksState}
                    setTasksState={setTasksState}
                  />
                );
              })}
          </ul>
        )}
        {filteredTasks.length === 0 && (
          <p className="noTasks">No Tasks Yet....</p>
        )}
      </div>
      <div className="mapsBox">
        <Map
          selectedPosition={selectedPosition}
          locationName={locationName}
          setLocationName={setLocationName}
        />
        <div className="prevTasksTable">
          <PrevTasksTable />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
