import { NavLink } from 'react-router-dom';
import './Nav.css';

function Nav() {
  return (
    <div className="Nav">
      <NavLink
        to="/"
        className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
      >
        About
      </NavLink>
      <NavLink
        to="/pi-stats"
        className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
      >
        Pi Stats
      </NavLink>
      <NavLink
        to="/pi-control"
        className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
      >
        Pi Control
      </NavLink>
    </div>
  );
}

export default Nav;
