import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import NavBar from './components/NavBar';
import Welcome from './pages/Welcome';
import AppointmentsPage from './pages/AppointmentsPage';
import AISummary from './pages/AISummary';
import PollingMessage from './pages/PollingMessage';
import NewTicketForm from './pages/NewTicketForm';
import TicketDetail from './pages/TicketDetail';
import TicketsList from './pages/TicketsList';

import './styles/main.scss';

function App() {
  const [tickets, setTickets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [toast, setToast] = useState('');
  const [currentUser] = useState('Nurse Jamie');

  useEffect(() => {
    fetchTickets();
    fetchAppointments();
  }, []);

  const fetchTickets = () => {
    axios.get('http://localhost:3000/tickets')
      .then((res) => setTickets(res.data))
      .catch((err) => console.error('Error fetching tickets:', err));
  };

  const fetchAppointments = () => {
    axios.get('http://localhost:3000/appointments')
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error('Error fetching appointments:', err));
  };

  const handleNewAppointment = (newAppointment) => {
    setAppointments((prev) => [...prev, newAppointment]);
    setToast('Appointment added.');
    setTimeout(() => setToast(''), 3000);
  };

  const handleAppointmentUpdate = (updatedAppointment) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === updatedAppointment.id ? updatedAppointment : appt
      )
    );
    setToast('Appointment updated.');
    setTimeout(() => setToast(''), 3000);
  };

  const handleAppointmentDelete = (deletedId) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== deletedId));
    setToast('Appointment canceled.');
    setTimeout(() => setToast(''), 3000);
  };

  const handleNewTicket = (ticket) => {
    setTickets((prev) => [...prev, ticket]);
    setToast('Ticket successfully created.');
    setTimeout(() => setToast(''), 3000);
  };

  const handleTicketUpdate = (updatedTicket) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === updatedTicket.id ? updatedTicket : ticket
      )
    );
  };

  return (
    <Router>
      <NavBar />
      <div className="app-content">
        {toast && <div className="toast">{toast}</div>}

        <Routes>
          <Route path="/" element={<Welcome />} />

          <Route
            path="/appointments"
            element={
              <AppointmentsPage
                appointments={appointments}
                onAppointmentAdded={handleNewAppointment}
                onAppointmentUpdated={handleAppointmentUpdate}
                onAppointmentDeleted={handleAppointmentDelete}
              />
            }
          />

          <Route
            path="/chat"
            element={
              <PollingMessage
                tickets={tickets}
                currentUser={currentUser}
              />
            }
          />

          <Route path="/summary" element={<AISummary />} />

          <Route
            path="/tickets"
            element={<TicketsList tickets={tickets} />}
          />

          <Route
            path="/tickets/new"
            element={
              <NewTicketForm
                currentUser={currentUser}
                onTicketCreated={handleNewTicket}
              />
            }
          />

          <Route
            path="/tickets/:id"
            element={
              <TicketDetail
                tickets={tickets}
                onTicketUpdate={handleTicketUpdate}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;













