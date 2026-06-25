import { useEffect, useRef, useState } from "react";

function formatTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi 👋 How can I help you today?",
      time: formatTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_BASE =
    window.location.hostname === "localhost"
      ? "http://localhost:5050"
      : "";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  const sendMessage = async () => {
    const userText = input.trim();
    if (!userText || loading) return;

    const userMessage = {
      from: "user",
      text: userText,
      time: formatTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const endpoint = `${API_BASE}/api/chat`;
      console.log("Sending request to:", endpoint);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        throw new Error(data.error || `Request failed: ${res.status}`);
      }

      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: data.reply || "Sorry, I could not reply right now.",
          time: formatTime(),
        },
      ]);
    } catch (error) {
      console.error("Chat fetch error:", error);

      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: error.message || "Unable to connect to chat server.",
          time: formatTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <div
        className="ai-button"
        onClick={() => setOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setOpen((prev) => !prev);
          }
        }}
      >
        <i className="ri-robot-2-line"></i>
      </div>

      {open && (
        <div className="ai-box">
          <div className="ai-header">
            <span>🤖 AI Assistant</span>
            <button
              className="ai-close"
              onClick={() => setOpen(false)}
              type="button"
              aria-label="Close"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>

          <div className="ai-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`msg-row ${msg.from}`}>
                <span className="time">{msg.time}</span>
                <div className={`msg ${msg.from}`}>{msg.text}</div>
              </div>
            ))}

            {loading && (
              <div className="msg-row bot">
                <span className="time">{formatTime()}</span>
                <div className="msg bot typing">Typing...</div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="ai-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Reply..."
              disabled={loading}
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
            >
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}