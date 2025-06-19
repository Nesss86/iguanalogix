import { useEffect, useState } from 'react';
import axios from 'axios';
import MessageForm from './components/MessageForm';
import AppointmentForm from './components/AppointmentForm';

function App() {
  const [messages, setMessages] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const fetchMessages = () => {
    axios.get('http://localhost:3000/messages')
      .then((res) => setMessages(res.data))
      .catch((err) => console.error('Error fetching messages:', err));
  };

  const fetchTickets = () => {
    axios.get('http://localhost:3000/tickets')
      .then((res) => setTickets(res.data))
      .catch((err) => console.error('Error fetching tickets:', err));
  };

  const fetchAppointments = () => {
    axios.get('http://localhost:3000/appointments')
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error('Error fetching appointments:', err));
  };

  useEffect(() => {
    fetchMessages();
    fetchTickets();
    fetchAppointments();
  }, []);

  const handleNewMessage = (newMessage) => {
    setMessages(prev => [...prev, newMessage]);
  };

  const handleNewAppointment = (newAppointment) => {
    setAppointments(prev => [...prev, newAppointment]);
  };

  const getTicketForMessage = (messageId) => {
    return tickets.find(ticket => ticket.message_id === messageId);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>IguanaLogix Messages</h1>

      <MessageForm onMessageAdded={handleNewMessage} />

      <ul>
        {messages.map((msg) => {
          const ticket = getTicketForMessage(msg.message_id);
          return (
            <li key={msg.id}>
              <strong>{msg.patient_name}</strong> — {msg.message_id}
              {ticket && (
                <ul style={{ marginTop: '0.25rem', marginBottom: '1rem' }}>
                  <li><em>Ticket:</em> {ticket.title}</li>
                  <li><em>Assigned To:</em> {ticket.assigned_to}</li>
                  <li><em>Status:</em> {ticket.status}</li>
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      <hr style={{ margin: '2rem 0' }} />

      <AppointmentForm onAppointmentAdded={handleNewAppointment} />

      <h2>All Appointments</h2>
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            <strong>{appt.patient_name}</strong> — {appt.department} — {new Date(appt.appointment_time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;





