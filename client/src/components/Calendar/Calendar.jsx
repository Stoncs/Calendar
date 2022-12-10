import React from "react";
import Day from "../day/day.jsx";
import "./Calendar.scss";
import PropTypes from "prop-types";
import { getAll } from "../../http/noteApi.js";

const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Calendar = ({activeDay, setActiveDay, states, state, setState, notes}) => {
  const month = activeDay.getMonth();
  let maxDays = nDays[month];
  const [counts, setCounts] = React.useState(Array(maxDays).fill(0));
  React.useEffect(() => {
    const year = activeDay.getFullYear();
    const month = activeDay.getMonth();
    let maxDays = nDays[month];
    const counts = Array(maxDays).fill(0);
    for (let i = 0; i < maxDays; i++) {
      for (const note in notes) {
        const date_db = new Date(notes[note].date);
        const date_cal = new Date(year, month, i);
        if (date_cal.getFullYear() == date_db.getFullYear() && date_cal.getMonth() == date_db.getMonth() && date_cal.getDate() == date_db.getDate()) counts[i] ++;
      }
    }
    setCounts(counts);
  }, [notes, activeDay]);
  const generateMatrix = () => {
    const matrix = [];

    const year = activeDay.getFullYear();
    const month = activeDay.getMonth();
    
    const firstDay = new Date(year, month, 1).getDay()-1;

    let maxDays = nDays[month];
    if (month == 1) {
      // February
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }

    let counter = 0;
    for (let row = 1; row < 7; row++) {
      if (counter < maxDays) {
        matrix[row] = [];
      } else {
        break;
      }
      for (let col = 0; col < 7; col++) {
        matrix[row][col] = <Day empty={true} />;
        if (row == 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          counter++;
          matrix[row][col] = <Day empty={false} date={new Date(year, month, counter)} activeDay={activeDay} setActiveDay={setActiveDay} states={states} state={state} setState={setState} count={counts[counter]}/>;
        } else if (row > 1 && counter < maxDays) {
          // Fill in rows only if the counter’s not greater than
          // the number of days in the month
          counter++;
          matrix[row][col] = <Day empty={false} date={new Date(year, month, counter)} activeDay={activeDay} setActiveDay={setActiveDay} states={states} state={state} setState={setState} count={counts[counter]}/>;
        }
      }
    }

    return matrix;
  };

  return (
    <div className="calendar">
      <div className="calendar__header">
        <button className="calendar__btn" onClick={() => setActiveDay(new Date(activeDay.getFullYear(), activeDay.getMonth()-1, activeDay.getDate()))}>{"<"}</button>
        <div>
          {activeDay.getFullYear()}
          <div className="calendar__month">{months[activeDay.getMonth()]}</div>
        </div>

        <button className="calendar__btn" onClick={() => setActiveDay(new Date(activeDay.getFullYear(), activeDay.getMonth()+1, activeDay.getDate()))}>{">"}</button>
      </div>
      <div className="row">{weekDays.map((item) => (<div className="day_week" key={item} >{item}</div>))}</div>
      {generateMatrix().map((row, n) => (
        <div className="row" key={n}>{
          row.map((day, i) => (<div key={day + "_" + n + "_" + i} >{day}</div>))
        // <Day key={item} num={item} setActive={setActiveDay}/>
        }</div>
      ))}
    </div>
  );
};

Calendar.propTypes = {
  activeDay: PropTypes.instanceOf(Date),
  setActiveDay: PropTypes.func,
  states: PropTypes.object,
  state: PropTypes.string,
  setState: PropTypes.func,
  notes: PropTypes.any
};

export default Calendar;
