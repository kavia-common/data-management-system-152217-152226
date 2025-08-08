import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import RecordsPage from "./pages/RecordsPage";

const routes = [
  { path: "/", label: "Dashboard" },
  { path: "/records", label: "Records" }
];

function App() {
  const [theme, setTheme] = useState("light");
  const [route, setRoute] = useState(
    window.location.pathname !== "/" ? "/records" : "/"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Sync route with browser address bar
  useEffect(() => {
    window.history.replaceState({}, "", route);
  }, [route]);

  const handleNavigate = (path) => {
    setRoute(path);
  };

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="App">
      <Navbar routes={routes} activeRoute={route} onNavigate={handleNavigate} />
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      <main>
        {route === "/" ? (
          <div className="dashboard">
            <h1 style={{ color: "var(--primary)" }}>Welcome to CRUD Manager</h1>
            <p>
              Use the menu to access and manage your records. This is a modern, responsive CRUD UI example.
            </p>
            <div className="cards">
              <div className="card">
                <h3>Records</h3>
                <p>List, add, edit, delete data records.</p>
                <button className="btn btn-primary" onClick={() => setRoute("/records")}>Go to Records</button>
              </div>
            </div>
          </div>
        ) : (
          <RecordsPage />
        )}
      </main>
    </div>
  );
}

export default App;
