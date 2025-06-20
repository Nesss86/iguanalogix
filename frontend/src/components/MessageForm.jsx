import { useState } from 'react';
import axios from 'axios';
import styles from './MessageForm.module.scss';

function MessageForm({ onMessageAdded }) {
  const [formData, setFormData] = useState({
    patient_name: '',
    message_id: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/messages', formData)
      .then((response) => {
        onMessageAdded(response.data);
        setFormData({ patient_name: '', message_id: '' });
      })
      .catch((error) => {
        console.error('Error creating message:', error);
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>New Message</h2>
      <input
        type="text"
        name="patient_name"
        placeholder="Patient Name"
        value={formData.patient_name}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <input
        type="text"
        name="message_id"
        placeholder="Message ID"
        value={formData.message_id}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <button type="submit" className={styles.button}>Send Message</button>
    </form>
  );
}

export default MessageForm;

