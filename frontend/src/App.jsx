import { useEffect, useState } from 'react';
import axios from 'axios';
import MessageForm from './components/MessageForm';

function App() {
  const [messages, setMessages] = useState([]);
  const [tickets, setTickets] = useState([]);

  const fetchMessages = () => {
    axios.get('http://localhost:3000/messages')
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  };

  const fetchTickets = () => {
    axios.get('http://localhost:3000/tickets')
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tickets:', error);
      });
  };

  useEffect(() => {
    fetchMessages();
    fetchTickets();
  }, []);

  const handleNewMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
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
    </div>
  );
}

export default App;



