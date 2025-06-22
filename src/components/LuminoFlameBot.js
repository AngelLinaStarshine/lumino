// LuminoFlameBot.js
import React, { useState } from 'react';
import './LuminoFlameBot.css';
import flameImg from '../assets/luminoFlame.png';

function LuminoFlameBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '🔥 Welcome to LuminoLearn! How can I assist you today?' }
  ]);
  const [userInput, setUserInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (userInput.trim() === '') return;
    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Got it! Our team will get back to you shortly. 💬' }]);
    }, 1000);
  };

  return (
    <div className="lumino-chatbot-container">
      <div
        className={`lumino-flame-icon ${isOpen ? 'active' : ''}`}
        onClick={toggleChat}
      >
        <img src={flameImg} alt="Lumino Flame" className="animated-flame" />
      </div>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>{msg.text}</div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LuminoFlameBot;
