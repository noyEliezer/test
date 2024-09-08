import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import items from '../guides.json';
import './EditGuide.css';

const EditGuide = () => {
  const { guideId } = useParams();
  const [guide, setGuide] = useState({});
  const [noGuide, setNoGuide] = useState(false);
  const [guideName, setGuideName] = useState('');
  const [guideDetails, setGuideDetails] = useState('');
  const [guideFile, setGuideFile] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        const response = await fetch(
          'https://maint-control-docker-image-2n3aq2y4ja-zf.a.run.app/guides/getSingleGuide',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ guide_id: guideId }), // Include the guide_id in the request body
          }
        );

        if (response.ok) {
          const data = await response.json();
          setGuide(data.answer[0]);
          setGuideName(data.answer[0].title);
          setGuideDetails(data.answer[0].description);
          setGuideFile(data.answer[0].file_path);
        } else {
          console.error('Failed to fetch guide');
          setNoGuide(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchGuide();
  }, [guideId]);

  const handleGuideNameChange = (event) => {
    setGuideName(event.target.value);
  };

  const handleGuideDetailsChange = (event) => {
    setGuideDetails(event.target.value);
  };

  const handleGuideFileChange = (event) => {
    setGuideFile(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (guideName.length === 0 || guideDetails.length === 0) {
      setError("Must enter Guide's name and details");
    } else if (guideName.length < 4) {
      setError("Guide's name must be at least 4 characters");
    } else if (guideDetails.length < 4) {
      setError("Guide's details must be at least 4 characters");
    } else {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        const response = await fetch(
          'https://maint-control-docker-image-2n3aq2y4ja-zf.a.run.app/guides/updateGuide',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              guide_id: guideId,
              title: guideName,
              description: guideDetails,
              file_path: guideFile,
            }),
          }
        );

        if (response.ok) {
          // Guide updated successfully
          // You can redirect or show a success message here
        } else {
          console.error('Failed to update guide');
          // Handle the error case
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="editGuideBox">
      <form onSubmit={handleSubmit} className="editGuideForm">
        <label className="editGuideLabel" htmlFor="guideName">
          Guide's name:
          <input
            id="guideName"
            className="editGuideInput"
            type="text"
            value={guideName}
            onChange={handleGuideNameChange}
          />
        </label>
        <label className="editGuideLabel" htmlFor="guideDetails">
          Guide's details:
          <textarea
            id="guideDetails"
            className="editGuideInput"
            value={guideDetails}
            onChange={handleGuideDetailsChange}
          />
        </label>
        <label className="editGuideLabel" htmlFor="guideFile">
          Guide's file:
          <input
            id="guideFile"
            className="guideFileInput"
            type="file"
            onChange={handleGuideFileChange}
          />
        </label>
        <button className="editGuideBtn" type="submit">
          Save
        </button>
      </form>
      {error && <p className="editGuideError">{error}</p>}
    </div>
  );
};

export default EditGuide;
