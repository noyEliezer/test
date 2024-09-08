import React, { useState } from 'react';
import subtasksJson from './subtasks.json';
import './Subtasks.css';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useParams } from 'react-router-dom';

const Subtasks = () => {
  const { missionid, taskId } = useParams();
  const [currentSubtask, setCurrentSubtask] = useState(0);

  const currentSubtasks = subtasksJson.find((subtask) => {
    return +subtask.father_task_id === +taskId;
  });

  const [subtasks, setSubtasks] = useState(
    currentSubtasks ? currentSubtasks.subtasks : []
  );

  function handleAddSubtask() {
    setSubtasks([...subtasks, { paragraphs: [''] }]);
  }

  function handleAddParagraph(subtaskIndex) {
    setSubtasks((prevSubtasks) => {
      const newSubtasks = [...prevSubtasks];
      newSubtasks[subtaskIndex].paragraphs.push('');
      return newSubtasks;
    });
  }

  function handleParagraphChange(subtaskIndex, paragraphIndex, event) {
    setSubtasks((prevSubtasks) => {
      const newSubtasks = [...prevSubtasks];
      newSubtasks[subtaskIndex].paragraphs[paragraphIndex] = event.target.value;
      return newSubtasks;
    });
  }

  function handleAddPhoto(subtaskIndex, paragraphIndex, event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSubtasks((prevSubtasks) => {
        const newSubtasks = [...prevSubtasks];
        const paragraph = newSubtasks[subtaskIndex].paragraphs[paragraphIndex];
        newSubtasks[subtaskIndex].paragraphs[
          paragraphIndex
        ] = `${paragraph}\nPhoto: ${reader.result}`;
        return newSubtasks;
      });
    };
    reader.readAsDataURL(file);
  }

  const handleRemoveImage = (subtaskIndex, paragraphIndex, index) => {
    console.log(subtaskIndex, paragraphIndex, index);
  };

  const tabHandler = (subtaskIndex) => {
    setCurrentSubtask(subtaskIndex);
  };

  const subtaskPhotoHandler = () => {};

  return (
    <div className="subtasksListBox">
      <div className="subtaskTabBox">
        {subtasks &&
          subtasks.map((subtask, subtaskIndex) => {
            const isActive = currentSubtask === subtaskIndex; // Check if current subtask is active
            return (
              <div
                className={`subtaskTab ${isActive ? 'active' : ''}`} // Add "active" class to active tab
                key={subtaskIndex}
                tabNum={subtaskIndex}
                onClick={tabHandler.bind(this, subtaskIndex)}
              >
                {subtaskIndex + 1}
              </div>
            );
          })}
        {subtasks.length === 0 && <div className="subtaskTabFiller">...</div>}
      </div>
      <form className="subtask-fill-form-container">
        <button className="taskButton" type="button" onClick={handleAddSubtask}>
          Add Subtask
        </button>
        {subtasks.map((subtask, subtaskIndex) => {
          const isActive = currentSubtask === subtaskIndex;

          return (
            <div
              key={subtaskIndex}
              className={`form-group ${isActive ? 'active' : ''}`}
            >
              <div className="subtaskTitleAndButton">
                <div className="subtaskTitle">
                  {/* <label htmlFor="subtaskTitle">{subtaskIndex + 1}.</label> */}
                  <input
                    type="text"
                    id="subtaskTitle"
                    defaultValue={subtask.title}
                  ></input>
                </div>
                <Fab
                  size="small"
                  color="white"
                  aria-label="add"
                  className="addParagraphButton"
                  onClick={() => handleAddParagraph(subtaskIndex)}
                >
                  <AddIcon type="button" />
                </Fab>
              </div>
              <ul>
                {subtask.paragraphs.map((paragraph, paragraphIndex) => (
                  <li key={paragraphIndex}>
                    <div>
                      <label
                        htmlFor={`subtask-${subtaskIndex}-paragraph-${paragraphIndex}-text`}
                      ></label>
                      <textarea
                        id={`subtask-${subtaskIndex}-paragraph-${paragraphIndex}-text`}
                        value={paragraph.text}
                        onChange={(event) =>
                          handleParagraphChange(
                            subtaskIndex,
                            paragraphIndex,
                            event
                          )
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`subtask-${subtaskIndex}-paragraph-${paragraphIndex}-photo`}
                      ></label>
                      <input
                        id={`subtask-${subtaskIndex}-paragraph-${paragraphIndex}-photo`}
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={(event) =>
                          handleAddPhoto(subtaskIndex, paragraphIndex, event)
                        }
                      />
                    </div>
                    <Slider infinite={true} swipe={true}>
                      {subtask?.paragraphs[
                        paragraphIndex
                      ]?.links_to_photos?.map((url, index) => (
                        <div className="subtasksPhotosSlider" key={index}>
                          <div className="removeImageButton">
                            <Fab
                              size="small"
                              color="white"
                              aria-label="remove image"
                              className="addParagraphButton"
                              onClick={() =>
                                handleRemoveImage(
                                  subtaskIndex,
                                  paragraphIndex,
                                  index,
                                  url
                                )
                              }
                            >
                              <DeleteIcon type="button" />
                            </Fab>
                          </div>
                          <img
                            title={`Slide ${index + 1}`}
                            onClick={subtaskPhotoHandler}
                            className="subtasksPhotos"
                            src={url}
                            alt={`Slide ${index}`}
                          />
                        </div>
                      ))}
                    </Slider>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default Subtasks;
