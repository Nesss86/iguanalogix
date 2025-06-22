import { NavLink } from 'react-router-dom';
import './NavBar.scss';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar__brand">IguanaLogix</div>
      <div className="navbar__links">
        <NavLink to="/" className="navbar__link">Welcome</NavLink>
        <NavLink to="/appointments" className="navbar__link">Appointments</NavLink>
        <NavLink to="/summary" className="navbar__link">AI Summary</NavLink>
        <NavLink to="/chat" className="navbar__link">Messenger</NavLink>
        <NavLink to="/tickets" className="navbar__link">Tickets</NavLink>
      </div>
    </nav>
  );
}

export default NavBar;

