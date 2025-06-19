import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/messages')
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  }, []);

  return (
    <div>
      <h1>IguanaLogix Messages</h1>
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

