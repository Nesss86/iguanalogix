import { useState } from 'react';
import axios from 'axios';

const departmentOptions = [
  'Cardiology',
  'Pediatrics',
  'Radiology',
  'Neurology',
  'General Medicine'
];

function AppointmentForm({ onAppointmentAdded }) {
  const [formData, setFormData] = useState({
    patient_name: '',
    department: '',
    appointment_time: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/appointments', formData)
      .then((response) => {
        onAppointmentAdded(response.data);
        setFormData({ patient_name: '', department: '', appointment_time: '' });
      })
      .catch((error) => {
        console.error('Error creating appointment:', error);
      });
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <h2>New Appointment</h2>
      <input
        type="text"
        name="patient_name"
        placeholder="Patient Name"
        value={formData.patient_name}
        onChange={handleChange}
        required
      />

      <select
        name="department"
        value={formData.department}
        onChange={handleChange}
        required
      >
        <option value="">Select Department</option>
        {departmentOptions.map((dept) => (
          <option key={dept} value={dept}>{dept}</option>
        ))}
      </select>

      <input
        type="datetime-local"
        name="appointment_time"
        value={formData.appointment_time}
        onChange={handleChange}
        required
      />

      <button type="submit">Create Appointment</button>
    </form>
  );
}

export default AppointmentForm;


