import { useState } from 'react';
import axios from 'axios';
import AppointmentForm from '../components/AppointmentForm';
import '../styles/_appointments.scss';

const departmentOptions = [
  'Cardiology',
  'Pediatrics',
  'Radiology',
  'Neurology',
  'General Medicine'
];

export default function AppointmentsPage({
  appointments,
  onAppointmentAdded,
  onAppointmentUpdated,
  onAppointmentDeleted
}) {
  const [editingId, setEditingId] = useState(null);
  const [editDateTime, setEditDateTime] = useState('');
  const [editDepartment, setEditDepartment] = useState('');

  const saveEdit = (id) => {
    // Don't convert to UTC — send local time string
    axios
      .patch(`http://localhost:3000/appointments/${id}`, {
        appointment_time: editDateTime,
        department: editDepartment
      })
      .then((res) => {
        onAppointmentUpdated(res.data);
        setEditingId(null);
        setEditDateTime('');
        setEditDepartment('');
      })
      .catch((err) => {
        console.error('Failed to update:', err);
      });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDateTime('');
    setEditDepartment('');
  };

  const deleteAppointment = (id) => {
    axios
      .delete(`http://localhost:3000/appointments/${id}`)
      .then(() => {
        onAppointmentDeleted(id);
      })
      .catch((err) => {
        console.error('Failed to delete:', err);
      });
  };

  return (
    <div className="appointments-container">
      <h2>All Appointments</h2>
      <AppointmentForm onAppointmentAdded={onAppointmentAdded} />

      <div className="appointments-list">
        {appointments.map((appt) => (
          <div className="appointment-card" key={appt.id}>
            <div className="details">
              <span><strong>Patient:</strong> {appt.patient_name}</span>

              {editingId === appt.id ? (
                <>
                  <label>
                    <strong>Department:</strong>
                    <select
                      value={editDepartment}
                      onChange={(e) => setEditDepartment(e.target.value)}
                    >
                      <option value="">Select a department</option>
                      {departmentOptions.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <strong>Date/Time:</strong>
                    <input
                      type="datetime-local"
                      value={editDateTime}
                      onChange={(e) => setEditDateTime(e.target.value)}
                    />
                  </label>
                </>
              ) : (
                <>
                  <span><strong>Department:</strong> {appt.department}</span>
                  <span><strong>Date/Time:</strong> {new Date(appt.appointment_time).toLocaleString()}</span>
                </>
              )}
            </div>

            <div className="actions">
              {editingId === appt.id ? (
                <>
                  <button onClick={() => saveEdit(appt.id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditingId(appt.id);
                      // Use local slice format
                      setEditDateTime(appt.appointment_time.slice(0, 16));
                      setEditDepartment(appt.department);
                    }}
                  >
                    Edit
                  </button>
                </>
              )}
              <button onClick={() => deleteAppointment(appt.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}










