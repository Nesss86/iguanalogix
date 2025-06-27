import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToasts } from './AppToastContainer';

export default function ChatWindow({
  messages = [],
  onClose,
  messageId,
  currentUser,
  tickets = [],
  appointments = [],
}) {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const [input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState(Array.isArray(messages) ? messages : []);
  const [linkedTicketId, setLinkedTicketId] = useState(null);
  const [linkedAppointmentId, setLinkedAppointmentId] = useState(null);
  const [sending, setSending] = useState(false);

  const { addToast } = useToasts();
  const openTickets = tickets.filter((t) => t.status === 'open');

  // Scroll to bottom when messages update
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [chatMessages]);

  // Poll for new messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/messages?message_id=${messageId}`);
      const newMessages = Array.isArray(res.data) ? res.data : [];

      setChatMessages((prev) => {
        const seen = new Set(prev.map((msg) => msg.id));
        const combined = [...prev];
        newMessages.forEach((msg) => {
          if (!seen.has(msg.id)) combined.push(msg);
        });
        return combined.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      });
    } catch (err) {
      console.error('❌ Failed to fetch messages:', err);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setSending(true);

    const payload = {
      message_id: messageId,
      content: input.trim(),
      user_id: currentUser?.id,
      sender: currentUser?.name,
    };

    try {
      const res = await axios.post('http://localhost:3000/messages', payload);
      setChatMessages((prev) => [...prev, res.data]);
      setInput('');
      addToast('Message sent!');
    } catch (err) {
      console.error('❌ Error sending message:', err);
      if (err.response?.data) {
        console.error('🔍 Backend Validation Errors:', err.response.data);
      }
      addToast('Failed to send message.');
    } finally {
      setSending(false);
    }
  };

  const handleLinkTicket = async (e) => {
    const id = parseInt(e.target.value, 10);
    try {
      await axios.post(`http://localhost:3000/messages/${messageId}/link_ticket`, {
        ticket_id: id,
      });
      setLinkedTicketId(id);
      addToast(`Linked to Ticket #${id}`);
    } catch (err) {
      console.error('Error linking ticket:', err);
      addToast('Failed to link ticket.');
    }
  };

  const handleUnlinkTicket = async () => {
    try {
      await axios.delete(`http://localhost:3000/messages/${messageId}/unlink_ticket`);
      setLinkedTicketId(null);
      addToast('Unlinked ticket.');
    } catch (err) {
      console.error('Error unlinking ticket:', err);
      addToast('Failed to unlink ticket.');
    }
  };

  const handleLinkAppointment = async (e) => {
    const id = parseInt(e.target.value, 10);
    try {
      await axios.post(`http://localhost:3000/messages/${messageId}/link_appointment`, {
        appointment_id: id,
      });
      setLinkedAppointmentId(id);
      addToast('Linked to Appointment');
    } catch (err) {
      console.error('Error linking appointment:', err);
      addToast('Failed to link appointment.');
    }
  };

  const handleUnlinkAppointment = async () => {
    try {
      await axios.delete(`http://localhost:3000/messages/${messageId}/unlink_appointment`);
      setLinkedAppointmentId(null);
      addToast('Unlinked appointment.');
    } catch (err) {
      console.error('Error unlinking appointment:', err);
      addToast('Failed to unlink appointment.');
    }
  };

  const handleCreateTicket = () => {
    const lastMsg = chatMessages[chatMessages.length - 1];
    if (!lastMsg) return;
    navigate('/tickets/new', { state: { message: lastMsg } });
  };

  return (
    <div className="chat-window-overlay">
      <div className="chat-window">
        <header>
          <span>Chat Thread: {messageId}</span>
          <button onClick={onClose}>✖</button>
        </header>

        <div className="return-button-wrapper">
          <button className="return-btn" onClick={onClose}>
            ⬅ Return to Messenger
          </button>

          <button className="create-ticket-btn" onClick={handleCreateTicket}>
            🎫 Create Ticket
          </button>
        </div>

        <div className="linked-info">
          {linkedTicketId && (
            <div className="linked-item">
              <span>Linked to Ticket #{linkedTicketId}</span>
              <button onClick={handleUnlinkTicket}>❌</button>
            </div>
          )}
          {linkedAppointmentId && (
            <div className="linked-item">
              <span>
                Linked to Appointment:{' '}
                {appointments.find((a) => a.id === linkedAppointmentId)?.patient_name}
              </span>
              <button onClick={handleUnlinkAppointment}>❌</button>
            </div>
          )}
        </div>

        <div className="select-linkers">
          <select defaultValue="" onChange={handleLinkTicket}>
            <option value="" disabled>
              Link to Ticket
            </option>
            {openTickets.map((t) => (
              <option key={t.id} value={t.id}>
                #{t.id} - {t.patient_name}
              </option>
            ))}
          </select>

          <select defaultValue="" onChange={handleLinkAppointment}>
            <option value="" disabled>
              Link to Appointment
            </option>
            {appointments.map((a) => (
              <option key={a.id} value={a.id}>
                {a.patient_name} – {new Date(a.appointment_time).toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        <div className="chat-messages" ref={scrollRef}>
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-bubble ${msg.user?.id === currentUser?.id ? 'self' : 'other'}`}
            >
              <div className="sender">{msg.user?.name || 'Unknown User'}</div>
              <div className="text">{msg.content}</div>
              <div className="timestamp">
                {new Date(msg.created_at).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={input}
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={sending}
          />
          <button onClick={handleSend} disabled={sending || !input.trim()}>
            {sending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}



















