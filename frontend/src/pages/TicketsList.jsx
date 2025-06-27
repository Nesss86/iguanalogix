import { Link } from 'react-router-dom';
import '../styles/_tickets-list.scss';

function TicketsList({ tickets }) {
  return (
    <div className="tickets-list">
      <h2>All Tickets</h2>

      {tickets.length === 0 ? (
        <p className="no-tickets">No tickets found.</p>
      ) : (
        <div className="ticket-grid">
          {tickets.map((ticket) => (
            <Link to={`/tickets/${ticket.id}`} key={ticket.id} className="ticket-card">
              <span className="ticket-number">#{ticket.ticket_number || ticket.id}</span>
              <h3>{ticket.patient_name}</h3>
              <p><strong>Reason:</strong> {ticket.reason_for_visit}</p>
              <p><strong>Department:</strong> {ticket.department}</p>
              <p><strong>Status:</strong> <span className={`status ${ticket.status}`}>{ticket.status}</span></p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default TicketsList;



