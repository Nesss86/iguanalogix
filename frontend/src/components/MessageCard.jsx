import { useState } from 'react';
import axios from 'axios';

export default function MessageCard({
  message,
  ticket,
  onCreateTicket,
  onOpenChat,
  appointments = []
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedLinkType, setSelectedLinkType] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const handleLinkSubmit = async () => {
    if (!selectedId || !selectedLinkType) return;

    const url = `/messages/${message.id}/${selectedLinkType === 'ticket' ? 'link_ticket' : 'link_appointment'}`;
    const payload = { [`${selectedLinkType}_id`]: selectedId };

    try {
      await axios.post(url, payload);
      alert(`${selectedLinkType} linked successfully.`);
      setShowOptions(false);
    } catch (error) {
      console.error('Linking failed:', error);
      alert('Failed to link. Please try again.');
    }
  };

  return (
    <li className="message-item">
      <div className="message-header">
        <strong onClick={() => onOpenChat(message)}>{message.patient_name}</strong>
        <span className="timestamp">{new Date(message.created_at).toLocaleString()}</span>
        <button className="toggle-button" onClick={() => setShowOptions(!showOptions)}>
          {showOptions ? 'Cancel' : 'Link'}
        </button>
      </div>

      {showOptions && (
        <div className="link-options">
          <select
            value={selectedLinkType}
            onChange={(e) => {
              setSelectedLinkType(e.target.value);
              setSelectedId('');
            }}
          >
            <option value="">Select type</option>
            <option value="ticket">Existing Ticket</option>
            <option value="appointment">Open Appointment</option>
          </select>

          {selectedLinkType === 'ticket' && (
            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
              <option value="">Choose Ticket</option>
              {[...(ticket ? [ticket] : [])].map((t) => (
                <option key={t.id} value={t.id}>
                  #{t.id} - {t.status}
                </option>
              ))}
            </select>
          )}

          {selectedLinkType === 'appointment' && (
            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
              <option value="">Choose Appointment</option>
              {appointments.map((appt) => (
                <option key={appt.id} value={appt.id}>
                  {appt.patient_name} @ {new Date(appt.appointment_time).toLocaleTimeString()}
                </option>
              ))}
            </select>
          )}

          <button className="submit-link" onClick={handleLinkSubmit} disabled={!selectedId}>
            Link
          </button>
        </div>
      )}

      {ticket && ticket.status && (
        <ul className="ticket-details">
          <li className={`status-${(ticket.status || 'unknown').toLowerCase()}`}>
            Ticket #{ticket.id} - {ticket.status}
          </li>
          {ticket.department && <li>Dept: {ticket.department}</li>}
          {ticket.reason_for_visit && <li>Reason: {ticket.reason_for_visit}</li>}
        </ul>
      )}
    </li>
  );
}






