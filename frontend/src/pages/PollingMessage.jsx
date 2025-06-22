import { useEffect, useState } from 'react';
import axios from 'axios';
import MessageForm from '../components/MessageForm';
import MessageCard from '../components/MessageCard';
import { AppToastContainer, useToasts } from '../components/AppToastContainer';
import { useNavigate } from 'react-router-dom';
import ChatWindow from '../components/ChatWindow';

export default function PollingMessage({ tickets, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeChat, setActiveChat] = useState(null);

  const { toasts, addToast } = useToasts();
  const navigate = useNavigate();

  const getTicketForMessage = (messageId) => {
    return tickets.find((ticket) => ticket.message_id === messageId);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/messages?page=${currentPage}&per_page=${perPage}`
        );
        const total = res.headers['x-total-count'] || res.data.total_count;
        const data = res.data.messages || res.data;

        setMessages(Array.isArray(data) ? data : []);
        setTotalCount(Number(total) || 0);
        setError('');
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to fetch messages.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [currentPage, perPage]);

  const filteredMessages = messages.filter((msg) => {
    if (!msg || !msg.patient_name || !msg.message_id) return false;
    const ticket = getTicketForMessage(msg.message_id);
    const matchesSearch =
      msg.patient_name.toLowerCase().includes(search.toLowerCase()) ||
      msg.message_id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      !statusFilter ||
      (ticket && ticket.status.toLowerCase() === statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const handleCreateTicket = (message) => {
    navigate('/tickets/new', { state: { message } });
  };

  const openChat = (message) => {
    setActiveChat(message.message_id);
  };

  const closeChat = () => {
    setActiveChat(null);
  };

  const chatMessages = messages.filter(
    (msg) => msg.message_id === activeChat
  );

  return (
    <div className="polling-message-container">
      <h2>Staff Messenger</h2>

      <MessageForm
        onMessageAdded={(newMessage) => {
          setMessages((prev) =>
            Array.isArray(prev) ? [newMessage, ...prev] : [newMessage]
          );
          setTotalCount((prev) => prev + 1);
          setCurrentPage(1);
          addToast('Message sent!');
        }}
        currentUser={currentUser}
      />

      <div className="filter-bar" aria-label="Search and filter messages">
        <input
          type="text"
          placeholder="Search by name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <ul className="message-list">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => {
            const ticket = getTicketForMessage(msg.message_id);
            return (
              <MessageCard
                key={msg.id}
                message={msg}
                ticket={ticket}
                onCreateTicket={handleCreateTicket}
                onOpenChat={openChat}
              />
            );
          })
        ) : (
          <li style={{ textAlign: 'center', padding: '1rem', opacity: 0.8 }}>
            No messages match your filters.
          </li>
        )}
      </ul>

      {totalCount > perPage && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀ Prev
          </button>

          {[...Array(Math.ceil(totalCount / perPage))].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={page === currentPage ? 'active' : ''}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(totalCount / perPage))
              )
            }
            disabled={currentPage === Math.ceil(totalCount / perPage)}
          >
            Next ▶
          </button>
        </div>
      )}

      {activeChat && (
        <ChatWindow
          messages={chatMessages}
          onClose={closeChat}
          messageId={activeChat}
          currentUser={currentUser}
        />
      )}

      <AppToastContainer toasts={toasts} />
    </div>
  );
}