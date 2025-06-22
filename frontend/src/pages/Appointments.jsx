import AppointmentForm from '../components/AppointmentForm';

export default function AppointmentsPage({ appointments, onAppointmentAdded }) {
  return (
    <div>
      <h2>All Appointments</h2>
      <AppointmentForm onAppointmentAdded={onAppointmentAdded} />
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            <strong>{appt.patient_name}</strong> — {appt.department} — {new Date(appt.appointment_time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

