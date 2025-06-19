import { useEffect, useState } from 'react';
import axios from 'axios';
import MessageForm from './components/MessageForm';

function App() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = () => {
    axios.get('http://localhost:3000/messages')
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleNewMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>IguanaLogix Messages</h1>
      
      <MessageForm onMessageAdded={handleNewMessage} />

      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <strong>{msg.patient_name}</strong> — {msg.message_id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


