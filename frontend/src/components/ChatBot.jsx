import { useState } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: input,
          result: window.simulationData || {}, // keep this
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "user", text: input },
        { role: "bot", text: data.answer },
      ]);

      setInput("");
    } catch (err) {
      console.error("Chat error:", err);
    }
  };

  return (
    <div className="flex flex-col h-full">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md text-sm ${
              msg.role === "user"
                ? "bg-blue-100 text-right"
                : "bg-gray-100 text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex p-2 border-t">
        <input
          type="text"
          className="flex-1 border rounded px-2 py-1 text-sm"
          placeholder="Ask about policy or economics..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="ml-2 bg-black text-white px-3 py-1 rounded"
        >
          Send
        </button>
      </div>

      {/* Smart Suggestions */}
      <div className="p-2 flex gap-2 flex-wrap">
        <button
          onClick={() => setInput("Why did GDP increase?")}
          className="text-xs bg-gray-200 px-2 py-1 rounded"
        >
          GDP
        </button>

        <button
          onClick={() => setInput("Explain inflation")}
          className="text-xs bg-gray-200 px-2 py-1 rounded"
        >
          Inflation
        </button>

        <button
          onClick={() => setInput("What is SAM?")}
          className="text-xs bg-gray-200 px-2 py-1 rounded"
        >
          SAM
        </button>

        <button
          onClick={() => setInput("What is CGE model?")}
          className="text-xs bg-gray-200 px-2 py-1 rounded"
        >
          CGE
        </button>
      </div>

    </div>
  );
}