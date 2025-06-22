import { useState, useMemo } from 'react';
import '../styles/_polling-message.scss';

export default function MessageCard({ message, ticket, onCreateTicket }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDetails = () => setIsExpanded(!isExpanded);

  const statusClass = ticket?.status?.toLowerCase();

  const timestamp = useMemo(() => {
    const now = new Date();
    const minutesAgo = Math.floor(Math.random() * 60);
    now.setMinutes(now.getMinutes() - minutesAgo);
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  return (
    <li className="message-item">
      <div className="message-header" onClick={toggleDetails}>
        <div>
          <strong>{message.patient_name}</strong> — {message.message_id}
        </div>
        <span className="timestamp">{timestamp}</span>
        <button className="toggle-button">
          {isExpanded ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      {ticket && isExpanded && (
        <ul className="ticket-details">
          <li><em>Ticket:</em> {ticket.title}</li>
          <li><em>Assigned To:</em> {ticket.assigned_to}</li>
          <li className={`status-${statusClass}`}><em>Status:</em> {ticket.status}</li>
        </ul>
      )}

      {!ticket && (
        <button
          className="create-ticket-btn"
          onClick={() => onCreateTicket(message)}
        >
          + Create Ticket
        </button>
      )}
    </li>
  );
}


