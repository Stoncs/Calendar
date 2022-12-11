import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./note.scss";

const Note = ({id, text, activeNote, setActiveNote}) => {
  return (
    <div className={classNames("note", {"note--active": id == activeNote })} onClick={() => setActiveNote(id)}>{text}</div>
  );
};

Note.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  activeNote: PropTypes.number,
  setActiveNote: PropTypes.func
};

export default Note;