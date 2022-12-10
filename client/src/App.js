import React from "react";
import Calendar from "./components/Calendar/Calendar.jsx";
import Area from "./components/area/Area.jsx";
import { getAll } from "./http/noteApi";

const states = {
  view: "view",
  edit: "edit"
};

function App() {
  const [activeDay, setActiveDay] = React.useState(new Date());
  const [state, setState] = React.useState(states.view);
  const [notes, setNotes] = React.useState([]);
  React.useEffect(() => {
    getAll().then((data) => {
      setNotes(data);
    });
  }, [activeDay]);
  return (
    <div className="app">
      <Calendar activeDay={activeDay} setActiveDay={setActiveDay} states={states} state={state} setState={setState} notes={notes}/>
      <Area activeDay={activeDay} state={state} setState={setState} states={states} notes={notes}/>
    </div>
  );
}

export default App;
