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
import ChatWindowWrapper from './pages/ChatWindowWrapper';
import MessengerPage from './pages/MessengerPage';

import './styles/main.scss';

const demoUsers = [
  { id: 14, name: "Nurse Jamie" },
  { id: 15, name: "Nurse Riley" },
  { id: 16, name: "Nurse Taylor" },
  { id: 17, name: "Dr. Smith" },
  { id: 18, name: "Dr. Patel" },  
  { id: 19, name: "Dr. Chen" }
];


function App() {
  const [tickets, setTickets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [toast, setToast] = useState('');
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : demoUsers[0];
  });

  useEffect(() => {
    fetchTickets();
    fetchAppointments();
  }, []);

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  const fetchTickets = () => {
    axios
      .get('http://localhost:3000/tickets')
      .then((res) => setTickets(res.data))
      .catch((err) => console.error('Error fetching tickets:', err));
  };

  const fetchAppointments = () => {
    axios
      .get('http://localhost:3000/appointments')
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error('Error fetching appointments:', err));
  };

  const handleNewAppointment = (newAppointment) => {
    setAppointments((prev) => [...prev, newAppointment]);
    showToast('Appointment added.');
  };

  const handleAppointmentUpdate = (updatedAppointment) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === updatedAppointment.id ? updatedAppointment : appt
      )
    );
    showToast('Appointment updated.');
  };

  const handleAppointmentDelete = (deletedId) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== deletedId));
    showToast('Appointment canceled.');
  };

  const handleNewTicket = (ticket) => {
    setTickets((prev) => [...prev, ticket]);
    showToast('Ticket successfully created.');
  };

  const handleTicketUpdate = (updatedTicket) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === updatedTicket.id ? updatedTicket : ticket
      )
    );
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <Router>
      <NavBar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        demoUsers={demoUsers}
      />

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

          <Route path="/summary" element={<AISummary />} />

          <Route path="/tickets" element={<TicketsList tickets={tickets} />} />

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

          <Route
            path="/chat"
            element={
              <ChatWindowWrapper
                currentUser={currentUser}
                tickets={tickets}
              />
            }
          />
        
          <Route
            path="/messenger"
            element={
              <MessengerPage
                currentUser={currentUser}
                tickets={tickets}
                appointments={appointments}
              />
            }
          />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;





















