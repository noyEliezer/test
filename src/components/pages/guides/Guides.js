import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Guides.css';
import Loading from '../../../UI/Loading';
import ConfirmGuideDeleteModal from '../../../UI/ConfirmGuideDeleteModal';

const Guides = () => {
  const [guides, setGuides] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickedGuideForDelete, setPickGuideForDelete] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch(
          'https://maint-control-docker-image-2n3aq2y4ja-zf.a.run.app/guides/getGuides?OFFSET=0&LIMIT=100',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setGuides(data.answer);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching guides:', error);
        setIsLoading(false);
      }
    };

    fetchGuides();
  }, []);

  const handleIsEditable = () => {
    if (!isRemoving) {
      setIsEditable(!isEditable);
    }
  };

  const handleIsRemoving = () => {
    if (!isEditable) {
      setIsRemoving(!isRemoving);
    }
  };

  const GuidesList = () => {
    const handleClick = (event, item) => {
      if (isRemoving) {
        event.preventDefault(); // Prevent the default navigation behavior
        openModalHandler(item);
      }
    };

    return (
      <>
        {guides && guides.length > 0 ? (
          guides.map((item) => {
            return (
              <Link
                to={
                  isEditable
                    ? `/guides/editGuide/${item?.guide_id}`
                    : !isRemoving
                    ? `/guides/details/${item?.guide_id}`
                    : null
                }
                onClick={(event) => handleClick(event, item)}
                key={item?.guide_id}
              >
                <div className="guideContainer">
                  <h1>{item?.title}</h1>
                  <p>{item?.description}</p>
                </div>
              </Link>
            );
          })
        ) : (
          <div>
            <h2 style={{ padding: '0.5rem', color: 'white' }}>
              No guides found...
            </h2>
          </div>
        )}
      </>
    );
  };

  const openModalHandler = (pickedGuide) => {
    if (!isModalOpen) {
      document.querySelector('.backdrop').classList.add('show');
    }
    console.log(pickedGuide);
    setPickGuideForDelete(pickedGuide);
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    if (isModalOpen) {
      document.querySelector('.backdrop').classList.remove('show');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="guideBox">
      <div className="guideButtons">
        <Link to="addGuide">
          <div className="guideBtn">
            <AddIcon className="addIcon" />
          </div>
        </Link>
        <div className="guideBtn" onClick={handleIsEditable}>
          {isEditable ? (
            <EditIcon className="editIconEditOn" />
          ) : (
            <EditIcon className="editIconEditOff" />
          )}
        </div>
        <div className="guideBtn" onClick={handleIsRemoving}>
          {isRemoving ? (
            <DeleteIcon className="deleteIconRemovingOn" />
          ) : (
            <DeleteIcon className="deleteIconRemovingOff" />
          )}
        </div>
      </div>
      <div className="items">{isLoading ? <Loading /> : <GuidesList />}</div>
      <ConfirmGuideDeleteModal
        token={token}
        closeModal={closeModalHandler}
        currentPickedGuide={pickedGuideForDelete}
      />
    </div>
  );
};

export default Guides;
