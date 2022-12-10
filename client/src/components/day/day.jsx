import React from "react";
import classNames from "classnames";
import "./day.scss";
import PropTypes from "prop-types";

const Day = ({empty, date, setActiveDay, activeDay, states, state, setState, count}) => {
 
  const onClick = () => {
    if (state == states.edit) {
      const agree = confirm("Вы создаёте, новую заметку. Уверены, что хотите перейти? Изменения не будут сохранены.");
      if (agree) {
        setActiveDay(new Date(activeDay.getFullYear(), activeDay.getMonth(), date.getDate()));
        setState(states.view);
      }
    } else {
      setActiveDay(new Date(activeDay.getFullYear(), activeDay.getMonth(), date.getDate()));
    }
  };
  return (
    <div className={classNames("day", {"day--active": !empty ? activeDay.getDate() == date.getDate() : false, "day--disabled": empty})} onClick={() => onClick()}>
      <div>{!empty ? date.getDate() : ""}</div>
      {count > 0 ? <div>{count} заметок</div> : ""}
    </div>
  );
};

Day.propTypes = {
  empty: PropTypes.bool,
  date: PropTypes.instanceOf(Date),
  setActiveDay: PropTypes.func,
  activeDay: PropTypes.instanceOf(Date),
  states: PropTypes.object,
  state: PropTypes.string,
  setState: PropTypes.func,
  count: PropTypes.number
};

export default Day;