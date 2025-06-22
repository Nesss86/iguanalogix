import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import '../styles/_new-ticket-form.scss';

export default function NewTicketForm({ onTicketCreated, currentUser }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const initialData = state?.message || {};

  const [patientName, setPatientName] = useState(initialData.patient_name || '');
  const [reason, setReason] = useState('');
  const [department, setDepartment] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateTicketNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    return `TKT-${timestamp}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const newTicket = {
      ticket_number: generateTicketNumber(),
      patient_name: patientName,
      reason_for_visit: reason,
      department,
      comments,
      message_id: initialData.message_id || null,
      assigned_to: currentUser || null
    };

    try {
      const response = await axios.post('http://localhost:3000/tickets', { ticket: newTicket });
      
      // ✅ Inform parent about the new ticket
      if (onTicketCreated) {
        onTicketCreated(response.data);
      }

      navigate('/tickets');
    } catch (err) {
      console.error(err);
      setError('Failed to create ticket.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-ticket-form-container">
      <h2>Create New Ticket</h2>
      {error && <p className="form-error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Patient Name:
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </label>

        <label>
          Reason for Visit:
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </label>

        <label>
          Department:
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </label>

        <label>
          Comments (optional):
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Create Ticket'}
        </button>
      </form>
    </div>
  );
}


