import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchAddress from './AddressLookup/SearchAddress';
import missionList from './missions.json';
import './editMission.css';

function EditMission(props) {
  const { missionId } = useParams();
  const mission = missionList.find(
    (mission) => mission.id === parseInt(missionId)
  );

  const navigate = useNavigate();
  const [picked, setPicked] = useState(false);
  const [addressVal, setAddressVal] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const priorityOptions = ['High', 'Medium', 'Low'];
  const defaultPriority = priorityOptions.includes(mission.urgency)
    ? mission.urgency
    : '';

  const areaOptions = ['Central Israel', 'Northern Israe', 'Southern Israel'];
  const defaultArea = areaOptions.includes(mission.area) ? mission.area : '';

  const [missionData, setMissionData] = useState({
    title: mission.title,
    address: mission.address,
    area: defaultArea,
    city: mission.city,
    status: mission.status,
    description: mission.description,
    created_date: mission.created_date,
    priority: defaultPriority,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      picked &&
      missionData.title !== '' &&
      missionData.address !== '' &&
      missionData.city !== '' &&
      missionData.area !== 'choose' &&
      missionData.description !== '' &&
      missionData.created_date !== '' &&
      missionData.priority !== 'choose'
    )
      navigate('/missions');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMissionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  missionData.address = addressVal;

  return (
    <div className="edit-mission-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={missionData.title}
            onChange={handleChange}
            required
          />
        </div>
        <SearchAddress
          setPicked={setPicked}
          setAddressVal={setAddressVal}
          setFullAddress={setFullAddress}
        />
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={missionData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="area">Area</label>
          <select
            id="area"
            name="area"
            value={missionData.area}
            onChange={handleChange}
            required
          >
            <option value="choose">Choose Geographic Area</option>
            <option value="Central Israel">Central Israel</option>
            <option value="Northern Israel">Northern Israel</option>
            <option value="Southern Israel">Southern Israel</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={missionData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="created_date">Created Date</label>
          <input
            type="date"
            id="created_date"
            name="created_date"
            value={missionData.created_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={missionData.priority}
            onChange={handleChange}
            required
          >
            <option value="">Choose Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <button type="submit" className="create-mission-btn">
          Save Mission
        </button>
      </form>
    </div>
  );
}

export default EditMission;
