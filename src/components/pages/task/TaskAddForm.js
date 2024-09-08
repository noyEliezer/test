import './TaskEditForm.css';
import Subtasks from './Subtasks/Subtasks';

const TaskAddForm = () => {
  const defaultTaskDetails = {
    product_serial_number: '',
    product_type: '',
    problem: '',
    status: '',
    location: '',
    date_created: '',
    date_updated: '',
  };

  return (
    <div className="editTasksBox">
      <div className="tasksListBox">
        <form className="task-fill-form-container">
          <div className="form-group">
            <label htmlFor="product_type">Product Type</label>
            <input
              id="product_type"
              type="text"
              defaultValue={defaultTaskDetails.product_type}
            />
          </div>
          <div className="form-group">
            <label htmlFor="product_serial_number">Product Serial Number</label>
            <input
              id="product_serial_number"
              type="text"
              defaultValue={defaultTaskDetails.product_serial_number}
            />
          </div>
          <div className="form-group">
            <label htmlFor="problem">Problem</label>
            <textarea id="problem" defaultValue={defaultTaskDetails.problem} />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              defaultValue={defaultTaskDetails.status}
              required
            >
              <option value="">Choose Status</option>
              <option value="Pending">Pending</option>
              <option value="InProgress">In Progress</option>
              <option value="Finished">Finished</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date_created">Date Created</label>
            <input
              type="date"
              id="date_created"
              name="date_created"
              defaultValue={defaultTaskDetails.date_created}
              required
            />
          </div>
          <button className="taskButton" type="submit">
            Save Task
          </button>
        </form>
      </div>
      <Subtasks />
    </div>
  );
};

export default TaskAddForm;
