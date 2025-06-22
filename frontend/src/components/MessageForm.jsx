import { useState } from 'react';
import axios from 'axios';
import '../styles/_message-form.scss';

function MessageForm({ onMessageAdded, currentUser }) {
  const [formData, setFormData] = useState({
    patient_name: '',
    content: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newMessage = {
      ...formData,
      message_id: crypto.randomUUID(),
      sender: currentUser || 'Anonymous',
      timestamp: new Date().toISOString()
    };

    axios.post('http://localhost:3000/messages', newMessage)
      .then((res) => {
        onMessageAdded(res.data); // ✅ Pass back actual new message
        setFormData({ patient_name: '', content: '' });
      })
      .catch(() => {
        setError('Failed to send message. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <h2>New Message</h2>

      <input
        type="text"
        name="patient_name"
        placeholder="Patient Name (optional)"
        value={formData.patient_name}
        onChange={handleChange}
      />

      <textarea
        name="content"
        placeholder="Write your message..."
        value={formData.content}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default MessageForm;






