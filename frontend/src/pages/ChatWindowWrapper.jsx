import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ChatWindow({ messages, messageId, currentUser, onClose }) {
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    setLoading(true);
    try {
      await axios.post('http://localhost:3000/messages', {
        message: {
          message_id: messageId,
          sender: currentUser,
          content: newMessage
        }
      });
      setNewMessage('');
    } catch (err) {
      console.error('Send failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = () => {
    navigate('/tickets/new', { state: { message_id: messageId } });
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>Thread: {messageId}</h3>
        <button onClick={onClose}>✖</button>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className="message-bubble">
            <div><strong>{msg.sender}</strong></div>
            <div>{msg.content}</div>
            <div className="time">
              {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <textarea
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
        <button onClick={handleCreateTicket}>
          Create Ticket
        </button>
      </div>
    </div>
  );
}

