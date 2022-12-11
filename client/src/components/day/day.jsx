import React from "react";
import classNames from "classnames";
import "./day.scss";
import PropTypes from "prop-types";

const holidays = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [0, 7],
  [0, 8],
  [1, 23],
  [2, 8],
  [4, 1],
  [4, 9],
  [5, 12],
  [10, 4]
];

const Day = ({empty, date, setActiveDay, activeDay, states, state, setState, count}) => {
 
  const isHoliday = (date) => {
    const my_date = new Date(date);
    if (my_date.getDay() == 0 || my_date.getDay() == 6) return true;
    for (const i of holidays) {
      if (my_date.getMonth() == i[0] && my_date.getDate() == i[1])
        return true;
    }
    return false;
  };

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
    <div className={classNames("day", {"day--active": !empty ? activeDay.getDate() == date.getDate() : false, "day--disabled": empty, "day--holiday": isHoliday(date)})} onClick={() => onClick()}>
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