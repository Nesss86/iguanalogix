import { useEffect, useState } from 'react';
import axios from 'axios';
import ChatWindow from '../components/ChatWindow';
import { useToasts } from '../components/AppToastContainer';
import { v4 as uuidv4 } from 'uuid';

export default function MessengerPage({ currentUser, tickets = [], appointments = [] }) {
  const [messages, setMessages] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    fetchMessages();

    let interval;
    const startPolling = () => {
      interval = setInterval(() => {
        if (!document.hidden) {
          setRefresh(prev => !prev);
        }
      }, 8000);
    };

    startPolling();

    const handleVisibilityChange = () => {
      if (document.hidden && interval) {
        clearInterval(interval);
      } else if (!document.hidden) {
        startPolling();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [refresh]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:3000/messages');
      const data = res.data;

      if (Array.isArray(data.messages)) {
        setMessages(data.messages);
      } else if (Array.isArray(data)) {
        setMessages(data);
      } else {
        console.warn('Unexpected response format from /messages:', data);
        setMessages([]);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setMessages([]);
    }
  };

  const groupedThreads = (Array.isArray(messages) ? messages : []).reduce((acc, msg) => {
    if (!msg.message_id || msg.content === null) return acc;
    if (!acc[msg.message_id]) acc[msg.message_id] = [];
    acc[msg.message_id].push(msg);
    return acc;
  }, {});

  const handleNewThread = () => {
    const newThreadId = uuidv4();
    setSelectedThread({ id: newThreadId, messages: [] });
  };

  const handleDeleteThread = async (threadId) => {
    try {
      const threadMessages = messages.filter(m => m.message_id === threadId);
      await Promise.all(threadMessages.map(msg =>
        axios.delete(`http://localhost:3000/messages/${msg.id}`)
      ));
      addToast(`Thread deleted.`);
      setRefresh(prev => !prev);
    } catch (err) {
      console.error('Delete failed:', err);
      addToast('Failed to delete thread.');
    }
  };

  return (
    <div className="messenger-page">
      {!selectedThread ? (
        <>
          <h2>Conversations</h2>
          <button onClick={handleNewThread} className="new-thread-btn">
            ➕ Start New Conversation
          </button>

          <ul className="conversation-list">
            {Object.entries(groupedThreads).map(([threadId, threadMessages]) => {
              const sortedMessages = [...threadMessages].sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
              );
              const last = sortedMessages[sortedMessages.length - 1];
              const senderName = last.user?.name || last.sender || 'Unknown';

              return (
                <li
                  key={threadId}
                  className="conversation-card"
                  onClick={() =>
                    setSelectedThread({ id: threadId, messages: sortedMessages })
                  }
                >
                  <div className="conversation-header">
                    <div className="sender-info">
                      <strong>{senderName}</strong>
                    </div>
                    <div className="header-right">
                      <span className="timestamp">
                        {new Date(last.created_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <button
                        className="delete-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteThread(threadId);
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <p className="message-preview">{last.content || '(no content)'}</p>
                </li>
              );
            })}
            {Object.keys(groupedThreads).length === 0 && (
              <li>No conversations found.</li>
            )}
          </ul>
        </>
      ) : (
        <ChatWindow
          messages={selectedThread.messages}
          messageId={selectedThread.id}
          onClose={() => setSelectedThread(null)}
          currentUser={currentUser}
          tickets={tickets}
          appointments={appointments}
        />
      )}
    </div>
  );
}



















