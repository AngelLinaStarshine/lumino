// LuminoFlameBot.js
import React, { useState } from 'react';
import './LuminoFlameBot.css';
import flameImg from '../assets/luminoFlame.png';
import whatsappIcon from '../assets/phone.png';
import { useNavigate } from 'react-router-dom';

function LuminoFlameBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(null);
  const [stage, setStage] = useState('askLanguage');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '🔥 Welcome! Select your language:' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [awaitingAccountConfirmation, setAwaitingAccountConfirmation] = useState(false);
  const navigate = useNavigate();

  const toggleChat = () => setIsOpen(!isOpen);

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, { sender: 'bot', text }]);
  };

  const addWhatsAppMessage = () => {
    const message = language === 'rus'
      ? 'Этот вариант лучше всего подходит для связи с нами напрямую. '
      : 'This option is better to connect and talk to us directly. ';

    setMessages(prev => [
      ...prev,
      {
        sender: 'bot',
        text: (
          <span>
            {message}
            <a
              href="https://wa.me/14374241380"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-link"
            >
              <img src={whatsappIcon} alt="WhatsApp" className="social-icon" />
              Chat on WhatsApp
            </a>
          </span>
        )
      }
    ]);
  };

  const handleLanguage = (lang) => {
    setLanguage(lang);
    setStage('mainMenu');
    const greeting = lang === 'rus'
      ? 'Как я могу помочь вам сегодня? Выберите: курсы, цены или аккаунт?'
      : 'How can I assist you today? Choose: courses, price or account?';
    addBotMessage(greeting);
  };

  const handleUserMessage = (text) => {
    setMessages(prev => [...prev, { sender: 'user', text }]);
    const msg = text.trim().toLowerCase();
    const isRus = language === 'rus';

    if (awaitingAccountConfirmation) {
      setAwaitingAccountConfirmation(false);
      if (msg === 'yes' || msg === 'да') {
        const response = isRus
          ? '➡️ Отлично! Пожалуйста, войдите в свой аккаунт.'
          : '➡️ Great! Please log in to your account.';
        addBotMessage(response);
      } else {
        const response = isRus
          ? '➡️ Переадресуем вас на страницу создания аккаунта...'
          : '➡️ Redirecting you to create an account...';
        addBotMessage(response);
        navigate('/signup');
      }
      return;
    }

    if ((isRus && msg.includes('цены')) || (!isRus && msg.includes('price'))) {
      const response = isRus
        ? '💡 Пожалуйста, просмотрите наш прайс-лист ниже и свяжитесь с нами по поводу скидок и акций.'
        : '💡 Please review our price list below and contact us for discounts and promotions.';
      addBotMessage(response);
      const pricingSection = document.getElementById('pricing') || document.querySelector('.pricelist-section');
      if (pricingSection) pricingSection.scrollIntoView({ behavior: 'smooth' });

    } else if ((isRus && msg.includes('курсы')) || (!isRus && msg.includes('courses'))) {
      const response = isRus
        ? '📚 Ознакомьтесь с нашими курсами ниже.'
        : '📚 Check out our courses below.';
      addBotMessage(response);
      const coursesSection = document.getElementById('courses') || document.querySelector('.courses-section');
      if (coursesSection) coursesSection.scrollIntoView({ behavior: 'smooth' });

    } else if (msg.includes('account') || msg.includes('аккаунт')) {
      const question = isRus
        ? 'У вас уже есть аккаунт? (да / нет)'
        : 'Do you already have an account? (yes / no)';
      addBotMessage(question);
      setAwaitingAccountConfirmation(true);

    } else {
      addWhatsAppMessage();
    }
  };

  const handleSend = () => {
    if (!userInput.trim()) return;
    handleUserMessage(userInput);
    setUserInput('');
  };

  return (
    <div className="lumino-chatbot-container">
      <div className={`lumino-flame-icon ${isOpen ? 'active' : ''}`} onClick={toggleChat}>
        <img src={flameImg} alt="Lumino Flame" className="animated-flame" />
      </div>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}

            {stage === 'askLanguage' && (
              <div className="chat-buttons">
                <button onClick={() => handleLanguage('rus')}>Русский</button>
                <button onClick={() => handleLanguage('english')}>English</button>
              </div>
            )}
          </div>

          {stage === 'mainMenu' && (
            <div className="chat-input">
              <input
                type="text"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                placeholder={language === 'rus' ? 'Введите сообщение...' : 'Type your message...'}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend}>
                {language === 'rus' ? 'Отправить' : 'Send'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LuminoFlameBot;
