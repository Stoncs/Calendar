import React from "react";
import useLocalStorage from "use-local-storage";
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
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage("theme", defaultDark ? "dark" : "light");
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  React.useEffect(() => {
    getAll().then((data) => {
      setNotes(data);
    });
  }, [activeDay]);
  return (
    <div className="app" data-theme={theme}>
      <button className="change-theme" onClick={switchTheme}>Сменить тему</button>
      <Calendar activeDay={activeDay} setActiveDay={setActiveDay} states={states} state={state} setState={setState} notes={notes}/>
      <Area activeDay={activeDay} state={state} setState={setState} states={states} notes={notes}/>
    </div>
  );
}

export default App;
