import { Link } from 'react-router-dom';
import '../styles/_welcome.scss';

export default function Welcome() {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1>Welcome to IguanaLogix</h1>
        <p>
          IguanaLogix is a messaging and ticketing platform designed to streamline communication between healthcare staff and support real-time integration with HL7 data through IguanaX.
        </p>
        <div className="btn-group">
          <Link to="/appointments" className="neumorphic-btn">View Appointments</Link>
          <Link to="/polling" className="neumorphic-btn">Open Staff Messenger</Link>
          <Link to="/tickets" className="neumorphic-btn">Browse Tickets</Link>
          <Link to="/ai-summary" className="neumorphic-btn secondary">AI Summary (Stretch Goal)</Link>
        </div>
      </div>
    </div>
  );
}

