import './AddGuide.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddGuide = () => {
  const navigate = useNavigate();
  const [guideName, setGuideName] = useState('');
  const [guideDetails, setGuideDetails] = useState('');
  const [guideFile, setGuideFile] = useState(null);
  const [error, setError] = useState('');

  const handleGuideNameChange = (event) => {
    setGuideName(event.target.value);
  };

  const handleGuideDetailsChange = (event) => {
    setGuideDetails(event.target.value);
  };

  const handleGuideFileChange = (event) => {
    setGuideFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (guideName.length === 0 && guideDetails.length === 0) {
      setError("Must enter Guide's name and details");
    } else if (guideName.length < 4) {
      setError("Guide's name must be at least 4 characters");
    } else if (guideDetails.length < 4) {
      setError("Guide's details must be at least 4 characters");
    } else {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        const formData = new FormData();
        formData.append('title', guideName);
        formData.append('description', guideDetails);
        formData.append('guideFile', guideFile);

        const response = await fetch(
          'https://maint-control-docker-image-2n3aq2y4ja-zf.a.run.app/guides/addGuide',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        console.log(response);

        if (response.ok) {
          // Guide added successfully
          // You can redirect or show a success message here
          navigate('../guides');
        } else {
          console.error('Failed to add guide');
          // Handle the error case
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="addGuideBox">
      <form onSubmit={handleSubmit} className="addGuideForm">
        <label className="addGuideLabel" htmlFor="guideName">
          Guide's name:
          <input
            id="guideName"
            className="addGuideInput"
            type="text"
            value={guideName}
            onChange={handleGuideNameChange}
          />
        </label>
        <br />
        <label className="addGuideLabel" htmlFor="guideDetails">
          Guide's details:
          <textarea
            id="guideDetails"
            className="addGuideInput"
            value={guideDetails}
            onChange={handleGuideDetailsChange}
          />
        </label>
        <br />
        <label className="addGuideLabel" htmlFor="guideFile">
          Insert file here:
          <input
            type="file"
            id="guideFile"
            className="guideFileInput"
            onChange={handleGuideFileChange}
          />
        </label>
        {error && <div className="addGuideError">{error}</div>}
        <br />
        <button className="addGuideButton" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddGuide;
