import './FillTask.css';
import React, { useState } from 'react';
import subtasksJson from '../Subtasks/subtasks.json';
import '../Subtasks/Subtasks.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams } from 'react-router-dom';
import FillTaskSubtaskPar from './FillTaskSubtaskPar';

const FillTask = () => {
  const { taskId } = useParams();
  const [currentSubtask, setCurrentSubtask] = useState(0);

  //finding subtasks
  const currentSubtasks = subtasksJson.find((subtask) => {
    return +subtask.father_task_id === +taskId;
  });
  const [subtasks, setSubtasks] = useState(
    currentSubtasks ? currentSubtasks.subtasks : []
  );

  //tabs handler
  const tabHandler = (subtaskIndex) => {
    setCurrentSubtask(subtaskIndex);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#ffa500';
      case 'InProgress':
        return '#1e90ff';
      case 'Finished':
        return '#008000';
      case 'Cancelled':
        return '#ff0000';
      default:
        return '#b2b2b2';
    }
  };

  function handleStatusChange(subtaskIndex, newStatus) {
    setSubtasks((prevSubtasks) => {
      const newSubtasks = [...prevSubtasks];
      newSubtasks[subtaskIndex].subtask_status = newStatus;
      return newSubtasks;
    });
  }

  return (
    <div className="fillTaskBox">
      <div className="subtaskTabBox">
        {subtasks &&
          subtasks.map((subtask, subtaskIndex) => {
            const isActive = currentSubtask === subtaskIndex;
            return (
              <div
                className={`subtaskTab ${isActive ? 'active' : ''}`}
                key={subtaskIndex}
                onClick={tabHandler.bind(this, subtaskIndex)}
              >
                {subtaskIndex + 1}
              </div>
            );
          })}
        {subtasks.length === 0 && <div className="subtaskTabFiller">...</div>}
      </div>
      <form className="fill-task-form-container">
        <div className="fill-task-form">
          {!subtasks.length && (
            <h2 style={{ color: 'white' }}>No Subtasks Found..</h2>
          )}
          {subtasks &&
            subtasks.map((subtask, subtaskIndex) => {
              const isActive = currentSubtask === subtaskIndex;
              return (
                <div
                  key={subtaskIndex}
                  className={`fill-task-form-group ${isActive ? 'active' : ''}`}
                >
                  <div className="fillTaskTitleAndButton">
                    <div className="fillTaskTitle">
                      <h1>{subtask.title}</h1>
                      <div className="fillTaskStatusBox">
                        <select
                          id="status"
                          name="status"
                          defaultValue={subtask.subtask_status}
                          onChange={(event) =>
                            handleStatusChange(subtaskIndex, event.target.value)
                          }
                          required
                        >
                          <option value="">Choose Status</option>
                          <option value="Pending">Pending</option>
                          <option value="InProgress">In Progress</option>
                          <option value="Finished">Finished</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <div
                          className="fillTaskStatus"
                          style={{
                            backgroundColor: getStatusColor(
                              subtask.subtask_status
                            ),
                          }}
                          title={subtask.subtask_status}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <ul>
                    {subtask.paragraphs.map((paragraph, paragraphIndex) => {
                      return (
                        <FillTaskSubtaskPar
                          key={paragraphIndex}
                          paragraphIndex={paragraphIndex}
                          paragraph={paragraph}
                          subtask={subtask}
                          subtaskIndex={subtaskIndex}
                          setSubtasks={setSubtasks}
                        />
                      );
                    })}
                  </ul>
                </div>
              );
            })}
        </div>
      </form>
    </div>
  );
};

export default FillTask;
