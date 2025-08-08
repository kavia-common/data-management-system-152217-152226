import React from "react";

// PUBLIC_INTERFACE
function Navbar({ routes, activeRoute, onNavigate }) {
  /** Navigation bar for main menu
   * @param {array} routes - [{path, label}]
   * @param {string} activeRoute
   * @param {func} onNavigate
   */
  return (
    <nav className="navbar">
      <div className="navbar-brand">CRUD Manager</div>
      <ul className="navbar-list">
        {routes.map((r) => (
          <li
            key={r.path}
            className={activeRoute === r.path ? "navbar-item active" : "navbar-item"}
            onClick={() => onNavigate(r.path)}
          >
            {r.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
