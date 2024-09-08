import { useState } from 'react';
import Fab from '@mui/material/Fab';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import Slider from 'react-slick';

const FillTaskSubtaskPar = ({
  paragraphIndex,
  paragraph,
  subtask,
  subtaskIndex,
  setSubtasks,
}) => {
  const [paragraphNotes, setParagraphNotes] = useState([]);

  // Add note handler
  function handleAddNote() {
    setSubtasks((prevSubtasks) => {
      const newSubtasks = [...prevSubtasks];
      const newParagraphs = [...newSubtasks[subtaskIndex].paragraphs];
      const newParagraph = {
        ...newParagraphs[paragraphIndex],
        maint_man_note: [
          ...(newParagraphs[paragraphIndex]?.maint_man_note || []),
          {
            text: '',
          },
        ],
      };
      newParagraphs[paragraphIndex] = newParagraph;
      newSubtasks[subtaskIndex].paragraphs = newParagraphs;
      return newSubtasks;
    });
  }

  // Add photo handler
  function handleAddPhoto(subtaskIndex, paragraphIndex, event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSubtasks((prevSubtasks) => {
        const newSubtasks = [...prevSubtasks];
        const newParagraphs = [...newSubtasks[subtaskIndex].paragraphs];
        const newParagraph = {
          ...newParagraphs[paragraphIndex],
          links_to_photos: [
            ...(newParagraphs[paragraphIndex]?.links_to_photos || []),
            reader.result,
          ],
        };
        newParagraphs[paragraphIndex] = newParagraph;
        newSubtasks[subtaskIndex].paragraphs = newParagraphs;
        return newSubtasks;
      });
    };
    reader.readAsDataURL(file);
  }

  // Remove photo handler
  const handleRemoveImage = (subtaskIndex, paragraphIndex, index) => {
    setSubtasks((prevSubtasks) => {
      const newSubtasks = [...prevSubtasks];
      const newParagraphs = [...newSubtasks[subtaskIndex].paragraphs];
      const newParagraph = {
        ...newParagraphs[paragraphIndex],
        links_to_photos: newParagraphs[paragraphIndex].links_to_photos.filter(
          (_, i) => i !== index
        ),
      };
      newParagraphs[paragraphIndex] = newParagraph;
      newSubtasks[subtaskIndex].paragraphs = newParagraphs;
      return newSubtasks;
    });
  };

  const subtaskPhotoHandler = () => {};

  const handleNoteChange = (event, index) => {
    const newNotes = [...paragraphNotes];
    newNotes[index] = event.target.value;
    setParagraphNotes(newNotes);
  };

  const handleDeleteNote = (index) => {
    setSubtasks((prevSubtasks) => {
      const newSubtasks = [...prevSubtasks];
      const newParagraphs = [...newSubtasks[subtaskIndex].paragraphs];
      const newParagraph = {
        ...newParagraphs[paragraphIndex],
        maint_man_note: newParagraphs[paragraphIndex].maint_man_note.filter(
          (_, i) => i !== index
        ),
      };
      newParagraphs[paragraphIndex] = newParagraph;
      newSubtasks[subtaskIndex].paragraphs = newParagraphs;
      return newSubtasks;
    });
  };

  return (
    <>
      <li key={paragraphIndex} className="fillTaskParBox">
        <div className="fillTaskPar">
          <div className="parNumber">{paragraphIndex + 1}.</div>
          <div className="fillTaskParDesc">
            <p>{paragraph?.text}</p>
            {paragraph?.maint_man_note?.length > 0 &&
              paragraph.maint_man_note.map((note, index) => {
                return (
                  <div key={index} className="noteContainer">
                    <textarea
                      className="fillTaskParNote"
                      defaultValue={note.text}
                      value={paragraphNotes[index]}
                      onChange={(event) => handleNoteChange(event, index)}
                    ></textarea>
                    <Fab
                      size="small"
                      color="white"
                      aria-label="delete note"
                      className="deleteNoteButton"
                      onClick={() => handleDeleteNote(index)}
                    >
                      <DeleteIcon />
                    </Fab>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="fillTaskPhotosBox">
          <div className="fillTaskAddPhotos">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(event) =>
                handleAddPhoto(subtaskIndex, paragraphIndex, event)
              }
            />
            <div>
              <Fab
                size="small"
                color="white"
                aria-label="add a note"
                className="addNoteButton"
                onClick={() => handleAddNote(subtaskIndex)}
              >
                <NoteAddIcon />
              </Fab>
            </div>
          </div>
          <Slider infinite={true} swipe={true} dots={true}>
            {subtask?.paragraphs[paragraphIndex]?.links_to_photos?.map(
              (url, index) => {
                return (
                  <div className="fillTaskPhotosSlider" key={index}>
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
                        <DeleteIcon />
                      </Fab>
                    </div>
                    <img
                      title={`Slide ${index + 1}`}
                      onClick={subtaskPhotoHandler}
                      className="fillTaskPhotos"
                      src={url}
                      alt={`Slide ${index}`}
                    />
                  </div>
                );
              }
            )}
          </Slider>
        </div>
      </li>
    </>
  );
};

export default FillTaskSubtaskPar;
