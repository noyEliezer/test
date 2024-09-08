import './Card.css';
import Card from './Card';

const DeleteTaskModal = ({ closeModal, selectedTaskToDelete }) => {
  const handleDeleteUser = () => {
    console.log('task deleted', selectedTaskToDelete);
    closeModal();
  };

  return (
    <div className="backdrop" onClick={closeModal}>
      <Card onClick={(event) => event.stopPropagation()}>
        <div className="modal-content">
          <h2>Are you sure you want to delete this task?</h2>
          <div className="modal-buttons">
            <button onClick={handleDeleteUser}>Yes</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DeleteTaskModal;
