import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AppToastContainer, useToasts } from '../components/AppToastContainer';

function TicketDetail({ onTicketUpdate }) {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);
  const { toasts, addToast } = useToasts();

  useEffect(() => {
    axios.get(`http://localhost:3000/tickets/${id}`)
      .then((res) => setTicket(res.data))
      .catch((err) => {
        console.error('Error fetching ticket:', err);
        setError('Failed to load ticket.');
      });
  }, [id]);

  const handleStatusChange = (e) => {
    const updatedStatus = e.target.value;
    axios
      .patch(`http://localhost:3000/tickets/${id}`, { status: updatedStatus })
      .then((res) => {
        setTicket(res.data);
        addToast(`Ticket status updated to "${updatedStatus}"`);

        // ✅ Notify App to update global ticket list
        if (onTicketUpdate) {
          onTicketUpdate(res.data);
        }
      })
      .catch((err) => {
        console.error('Error updating status:', err);
        setError('Failed to update status.');
      });
  };

  if (error) return <p>{error}</p>;
  if (!ticket) return <p>Loading ticket...</p>;

  return (
    <div className="ticket-detail">
      <h2>Ticket #{ticket.ticket_number || ticket.TicketDetail}</h2>
      <p><strong>Title:</strong> {ticket.title}</p>
      <p><strong>Assigned To:</strong> {ticket.assigned_to || 'Unassigned'}</p>
      <p><strong>Notes:</strong> {ticket.notes || 'None'}</p>
      <p><strong>Linked Message ID:</strong> {ticket.message_id || 'None'}</p>

      <label><strong>Status:</strong></label>
      <select value={ticket.status} onChange={handleStatusChange}>
        <option value="open">Open</option>
        <option value="pending">Pending</option>
        <option value="closed">Closed</option>
      </select>

      <AppToastContainer toasts={toasts} />
    </div>
  );
}

export default TicketDetail;





