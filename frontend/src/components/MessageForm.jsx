import { useState } from 'react';
import axios from 'axios';

export default function MessageForm({ onMessageAdded }) {
  const [formData, setFormData] = useState({
    message_id: '',
    patient_name: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/messages', formData)
      .then((response) => {
        onMessageAdded?.(response.data);
        setFormData({ message_id: '', patient_name: '', content: '' });
      })
      .catch((error) => {
        console.error('Error adding message:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
      <div>
        <label>Message ID:</label>
        <input
          type="text"
          name="message_id"
          value={formData.message_id}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Patient Name:</label>
        <input
          type="text"
          name="patient_name"
          value={formData.patient_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Message Content:</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>
      <button type="submit">Submit Message</button>
    </form>
  );
}
