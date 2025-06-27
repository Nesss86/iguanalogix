import { NavLink } from 'react-router-dom';
import './NavBar.scss';

function NavBar({ currentUser, setCurrentUser, demoUsers }) {
  const handleUserChange = (e) => {
    const selected = demoUsers.find(
      (u) => u.id === parseInt(e.target.value)
    );
    setCurrentUser(selected);
    localStorage.setItem('currentUser', JSON.stringify(selected));
  };

  return (
    <nav className="navbar">
      <div className="navbar__brand">IguanaLogix</div>

      <div className="navbar__user-picker">
        <label htmlFor="user-select">User:</label>
        <select
          id="user-select"
          value={currentUser?.id || ""}
          onChange={handleUserChange}
        >
          {demoUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="navbar__links">
        <NavLink to="/" className="navbar__link">Welcome</NavLink>
        <NavLink to="/appointments" className="navbar__link">Appointments</NavLink>
        <NavLink to="/summary" className="navbar__link">AI Summary</NavLink>
        <NavLink to="/messenger" className="navbar__link">Messenger</NavLink>
        <NavLink to="/tickets" className="navbar__link">Tickets</NavLink>
      </div>
    </nav>
  );
}

export default NavBar;




