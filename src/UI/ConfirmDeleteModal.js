import './Card.css';
import Card from './Card';

const ConfirmDeleteModal = ({
  token,
  users,
  setUsers,
  closeModal,
  currentPickedUser,
}) => {
  async function deleteUser() {
    try {
      const response = await fetch(
        `https://maint-control-docker-image-2n3aq2y4ja-zf.a.run.app/users/deleteUser`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_name: currentPickedUser.user_name,
            email: currentPickedUser.email,
            company_id: currentPickedUser.company_id,
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

  const handleDeleteUser = async () => {
    try {
      await deleteUser(
        currentPickedUser.user_id,
        currentPickedUser.user_name,
        currentPickedUser.email,
        currentPickedUser.company_id
      );
      const updatedUsers = users.filter(
        (user) => user.user_id !== currentPickedUser.user_id
      );
      setUsers(updatedUsers);
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="backdrop" onClick={closeModal}>
      <Card onClick={(event) => event.stopPropagation()}>
        <div className="modal-content">
          <h2>Are you sure you want to delete this user?</h2>
          <div className="modal-buttons">
            <button onClick={handleDeleteUser}>Yes</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ConfirmDeleteModal;
