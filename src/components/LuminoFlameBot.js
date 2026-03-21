// src/components/LuminoFlameBot.js
// ENGLISH ONLY + agent-ready structure
// - No inline styles
// - Keeps stage (USED) to avoid eslint warning
// - Fixes: BOOKING_CALENDAR_URL defined
// - Account flow: if NO account → open Calendly booking
// - Intent router + safe navigate + scroll helpers

import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LuminoFlameBot.css";

import flameImg from "../assets/luminoFlame.png";
import whatsappIcon from "../assets/phone.png";

const WHATSAPP_URL =
  "https://wa.me/14374241380?text=Hi%20LuminoLearn%20%F0%9F%91%8B%20I%20have%20a%20question%20about%20pricing%20and%20learning%20paths.";

const BOOKING_CALENDAR_URL =
  "https://calendly.com/lumino-luminolearn/new-meeting-1";

function LuminoFlameBot() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  // ✅ Agent-ready stages (and USED)
  // mainMenu | confirmAccount | booking
  const [stage, setStage] = useState("mainMenu");

  const [userInput, setUserInput] = useState("");

  const [messages, setMessages] = useState([
    { sender: "bot", text: "🔥 Welcome! How can I help today? (Programs, Tuition, Account)" },
  ]);

  const toggleChat = () => setIsOpen((v) => !v);

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "bot", text }]);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
  };

  const openBooking = () => {
    window.open(BOOKING_CALENDAR_URL, "_blank", "noopener,noreferrer");
  };

  const addWhatsAppMessage = () => {
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: (
          <span>
            This is the fastest way to reach us directly.{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-link"
            >
              <img src={whatsappIcon} alt="WhatsApp" className="social-icon" />
              Chat on WhatsApp
            </a>
          </span>
        ),
      },
    ]);
  };

  const scrollTo = (id, fallbackSelector) => {
    const el =
      document.getElementById(id) ||
      (fallbackSelector ? document.querySelector(fallbackSelector) : null);

    if (!el) return false;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  };

  // If user isn't on the right route, navigate first, then scroll
  const navigateAndScroll = (path, id, fallbackSelector) => {
    const alreadyThere = location.pathname === path;

    if (alreadyThere) {
      return scrollTo(id, fallbackSelector);
    }

    navigate(path);

    // Small delay so the new page mounts
    window.setTimeout(() => {
      scrollTo(id, fallbackSelector);
    }, 250);

    return true;
  };

  // =========================
  // Agent-ready: intent router
  // =========================
  const intents = useMemo(
    () => ({
      tuition: ["tuition", "price", "pricing", "cost", "fees", "plan", "plans", "payment"],
      programs: ["programs", "program", "learning path", "learning paths", "courses", "course"],
      account: ["account", "login", "log in", "sign in", "signup", "sign up", "register"],
      meeting: ["book", "booking", "meeting", "call", "consultation", "schedule", "calendly"],
      whatsapp: ["whatsapp", "phone", "talk to you", "contact", "chat"],
      yes: ["yes", "y", "yeah", "yep", "sure", "i do", "i have"],
      no: ["no", "n", "nope", "not yet", "i don't", "dont", "do not", "haven't"],
    }),
    []
  );

  const detectIntent = (msgLower) => {
    const hit = (arr) => arr.some((k) => msgLower.includes(k));
    if (hit(intents.tuition)) return "tuition";
    if (hit(intents.programs)) return "programs";
    if (hit(intents.meeting)) return "meeting";
    if (hit(intents.account)) return "account";
    if (hit(intents.whatsapp)) return "whatsapp";
    return "fallback";
  };

  const handleAccountConfirmation = (msgLower) => {
    const saidYes = intents.yes.some((k) => msgLower === k || msgLower.includes(k));
    const saidNo = intents.no.some((k) => msgLower === k || msgLower.includes(k));

    if (saidYes) {
      addBotMessage("➡️ Great! Please log in to your account.");
      setStage("mainMenu");
      navigate("/login");
      return;
    }

    if (saidNo) {
      addBotMessage("➡️ No problem, let’s start with a quick complimentary consultation.");
      setStage("booking");
      openBooking();
      addBotMessage("If you want, you can also message us on WhatsApp for quick questions.");
      addWhatsAppMessage();
      setStage("mainMenu");
      return;
    }

    addBotMessage('Please reply “yes” or “no”. Do you already have an account?');
    setStage("confirmAccount");
  };

  const handleUserMessage = (text) => {
    const raw = text || "";
    const msg = raw.trim();
    if (!msg) return;

    addUserMessage(msg);
    const msgLower = msg.toLowerCase();

    // Stage routing
    if (stage === "confirmAccount") {
      handleAccountConfirmation(msgLower);
      return;
    }

    // Intent routing
    const intent = detectIntent(msgLower);

    if (intent === "tuition") {
      addBotMessage("💡 Here are our tuition plans.");
      // Change the anchor if your Tuition page uses a different id
      navigateAndScroll("/tuition", "pricing", ".pricing-section");
      return;
    }

    if (intent === "programs") {
      addBotMessage("📚 Here are our learning paths.");
      // Scroll to first course card on Programs
      navigateAndScroll("/programs", "course-math", ".courses-container");
      return;
    }

    if (intent === "meeting") {
      addBotMessage("✅ Perfect, here’s the complimentary consultation link.");
      openBooking();
      addBotMessage("If you prefer messaging first, you can also reach us on WhatsApp:");
      addWhatsAppMessage();
      return;
    }

    if (intent === "account") {
      addBotMessage("Do you already have an account? (yes / no)");
      setStage("confirmAccount");
      return;
    }

    if (intent === "whatsapp") {
      addWhatsAppMessage();
      return;
    }

    // Fallback (agent-ready)
    addBotMessage("I can help with Programs, Tuition, or booking a complimentary consultation.");
    addBotMessage("What would you like to do?");
    addBotMessage("• Type: Programs  • Tuition  • Complimentary consultation");
  };

  const handleSend = () => {
    if (!userInput.trim()) return;
    handleUserMessage(userInput);
    setUserInput("");
  };

  return (
    <div className="lumino-chatbot-container">
      <button
        type="button"
        className={`lumino-flame-icon ${isOpen ? "active" : ""}`}
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <img src={flameImg} alt="Lumino Flame" className="animated-flame" />
      </button>

      {isOpen && (
        <div
          className="chat-window"
          role="dialog"
          aria-modal="false"
          aria-label="LuminoFlameBot chat"
        >
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* no inline styles */}
          <div className="chat-input">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button type="button" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LuminoFlameBot;
