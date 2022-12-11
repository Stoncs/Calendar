import React from "react";
import "./Area.scss";
import PropTypes from "prop-types";
import { create, deleteById } from "../../http/noteApi";
import Note from "../note/note.jsx";
import { FormattedMessage } from "react-intl";

const Area = ({activeDay, state, setState, states, notes}) => {
  const [value, setValue] = React.useState("");
  const [activeNote, setActiveNote] = React.useState(-1);
  const [noteList, setNoteList] = React.useState([]);
  const onClickSave = async (text) => {
    try {
      if (value != "") {
        const data = await create(text, activeDay);
        setValue("");
      }
    } catch (error) {
      alert(error);
    } finally {
      setState(states.view);
    }
  };

  const onClickCancel = () => {
    setState(states.view);
    setValue("");
  };

  React.useEffect(() => {
    const ar_notes = [];
    for (const note in notes) {
      const date_db = new Date(notes[note].date);
      if (activeDay.getFullYear() == date_db.getFullYear() && activeDay.getMonth() == date_db.getMonth() && activeDay.getDate() == date_db.getDate()) ar_notes.push({id: notes[note].id, text: notes[note].text});
    }
    setNoteList(ar_notes);
  }, [notes, activeDay]);
  
  const onClickCreate = () => {
    setState(states.edit); 
    setActiveNote(-1);
  };

  const onClickDelete = () => {
    deleteById(activeNote); 
    setActiveNote(-1);

  };
  return (
    <div className="area">
      <div className="area__header">{<FormattedMessage id='notes' />} {activeDay.getDate() + "." + (activeDay.getMonth() + 1) + "." + activeDay.getFullYear()}</div>
      {(state == states.view) ?
        <div className="area__list-notes">
          {noteList.map((item) => <Note key={item.id} id={item.id} text={item.text} activeNote={activeNote} setActiveNote={setActiveNote}/>)}
        </div>
        :
        <div className="area__text-area">
          <textarea value={value} onChange={(e) => setValue(e.target.value)}/>
        </div>
      }
      {(state == states.view) ?
        <div className="area__buttons">
          <button onClick={() => onClickCreate()}>{<FormattedMessage id='create' />}</button>
          <button onClick={() => onClickDelete()}>{<FormattedMessage id='delete' />}</button>
        </div>
        :
        <div className="area__buttons">
          <button onClick={() => onClickSave(value)}>{<FormattedMessage id='save' />}</button>
          <button onClick={() => onClickCancel()}>{<FormattedMessage id='cancel' />}</button>
        </div>
      }
    </div>
  );
};

Area.propTypes = {
  activeDay: PropTypes.instanceOf(Date),
  state: PropTypes.string,
  setState: PropTypes.func,
  states: PropTypes.object,
  notes: PropTypes.any
};

export default Area;