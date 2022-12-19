import React from "react";
import useLocalStorage from "use-local-storage";
import {FormattedMessage, IntlProvider}  from "react-intl";
import Calendar from "./components/Calendar/Calendar.jsx";
import Area from "./components/area/Area.jsx";
import { getAll } from "./http/noteApi";
import { messages } from "./i18n/messages";
import { LOCALES } from "./i18n/locales";

const states = {
  view: "view",
  edit: "edit"
};

function App() {
  const [locale, setLocale] = React.useState(LOCALES.RUSSIAN);
  const [activeDay, setActiveDay] = React.useState(new Date());
  const [state, setState] = React.useState(states.view);
  const [notes, setNotes] = React.useState([]);
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)") && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage("theme", defaultDark ? "dark" : "light");
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  const switchLang = () => {
    const newLocale = locale === LOCALES.RUSSIAN ? LOCALES.ENGLISH : LOCALES.RUSSIAN;
    setLocale(newLocale);
  };
  React.useEffect(() => {
    getAll().then((data) => {
      setNotes(data);
    });
  }, [activeDay]);
  return (
    <IntlProvider messages={messages[locale]} locale={locale} defaultLocale={LOCALES.RUSSIAN}>
      <div className="app" data-theme={theme}>
        <button className="change-theme" onClick={switchTheme}>{<FormattedMessage id="changeTheme" />}</button>
        <button className="change-lang" onClick={switchLang}>{<FormattedMessage id='changeLang' />}</button>
        <Calendar activeDay={activeDay} setActiveDay={setActiveDay} states={states} state={state} setState={setState} notes={notes}/>
        <Area activeDay={activeDay} state={state} setState={setState} states={states} notes={notes}/>
      </div>
    </IntlProvider>
  );
}

export default App;
