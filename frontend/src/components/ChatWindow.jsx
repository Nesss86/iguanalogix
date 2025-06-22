import '../styles/_chat-window.scss';

export default function ChatWindow({ conversation, onClose, currentUser }) {
  return (
    <div className="chat-window-overlay">
      <div className="chat-window">
        <header>
          <h3>Conversation {conversation?.id}</h3>
          <button onClick={onClose}>×</button>
        </header>

        <div className="chat-messages">
          {conversation?.messages?.map((msg) => (
            <div
              key={msg.id}
              className={`chat-bubble ${msg.sender === currentUser ? 'self' : 'other'}`}
            >
              <strong>{msg.sender}</strong>
              <p>{msg.content}</p>
            </div>
          ))}
        </div>

        <form className="chat-input">
          <input type="text" placeholder="Type your message..." />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
