import "./PrevTasksTable.css";
import tasks from "./prevTasks.json";

const PrevTasksTable = () => {
  return (
    <table>
      <thead>
        <tr className="tableHead">
          <th>Task number</th>
          <th>Task name</th>
          <th>Description</th>
          <th>Date</th>
          <th>Covered</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.number}>
            <td>{task.number}</td>
            <td>{task.name}</td>
            <td>{task.description}</td>
            <td>{task.date}</td>
            <td>{task.covered}</td>
            <td>{task.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PrevTasksTable;
