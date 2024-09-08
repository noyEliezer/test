import './Card.css';
import Card from './Card';

const ConfirmGuideDeleteModal = ({ token, closeModal, currentPickedGuide }) => {
  async function deleteGuide() {
    try {
      console.log({
        file_name: currentPickedGuide.file_name,
        guide_id: currentPickedGuide.guide_id,
      });
      const response = await fetch(
        `https://maint-control-docker-image-2n3aq2y4ja-zf.a.run.app/guides/deleteGuide`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            file_name: currentPickedGuide.file_name,
            guide_id: currentPickedGuide.guide_id,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  const handleDeleteGuide = () => {
    deleteGuide();
    closeModal();
    // window.location.reload();
  };

  return (
    <div className="backdrop" onClick={closeModal}>
      <Card onClick={(event) => event.stopPropagation()}>
        <div className="modal-content">
          <h2>Are you sure you want to delete this guide?</h2>
          <h3>{currentPickedGuide?.title}</h3>
          <div className="modal-buttons">
            <button onClick={handleDeleteGuide}>Yes</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ConfirmGuideDeleteModal;
