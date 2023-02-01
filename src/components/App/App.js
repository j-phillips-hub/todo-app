import React from "react";
import useLocalStorage from "use-local-storage";
import ToDo from "../ToDo/ToDo";
import Moon from "../../assets/images/icon-moon.svg";
import Sun from "../../assets/images/icon-sun.svg";
import "./App.scss";

function App() {
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className="App" data-theme={theme}>
      <header>
        <h1>TODO</h1>
        <img
          onClick={toggleTheme}
          src={theme === "light" ? Moon : Sun}
          alt="Toggle Theme"
        />
      </header>
      <ToDo />
    </div>
  );
}

export default App;
