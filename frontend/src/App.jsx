import { useEffect, useState } from 'react';
import axios from 'axios';
import MessageForm from './components/MessageForm';
import AppointmentForm from './components/AppointmentForm';

function App() {
  const [messages, setMessages] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // Fetch data
  const fetchMessages = () => {
    axios.get('http://localhost:3000/messages')
      .then((response) => setMessages(response.data))
      .catch((error) => console.error('Error fetching messages:', error));
  };

  const fetchTickets = () => {
    axios.get('http://localhost:3000/tickets')
      .then((response) => setTickets(response.data))
      .catch((error) => console.error('Error fetching tickets:', error));
  };

  const fetchAppointments = () => {
    axios.get('http://localhost:3000/appointments')
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error('Error fetching appointments:', error));
  };

  // On mount
  useEffect(() => {
    fetchMessages();
    fetchTickets();
    fetchAppointments();
  }, []);

  // Handlers
  const handleNewMessage = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleNewAppointment = (newAppt) => {
    setAppointments((prev) => [...prev, newAppt]);
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

      <hr />

      <h1>Appointments</h1>
      <AppointmentForm onAppointmentAdded={handleNewAppointment} />

      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            <strong>{appt.patient_name}</strong> — {appt.department} @ {new Date(appt.appointment_time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;




