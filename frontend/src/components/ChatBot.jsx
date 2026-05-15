import { useState } from "react";
import { askQuestion } from "../services/api";
import ReactMarkdown from "react-markdown";

const ChatBox = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      const data = await askQuestion(question);

      const aiMessage = {
        role: "assistant",
        content: data.answer,
        sources: data.sources,
      };

      setMessages((prev) => [...prev, aiMessage]);

      setQuestion("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
      <div className="h-[500px] overflow-y-auto mb-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl max-w-3xl ${
              msg.role === "user" ? "bg-blue-600 ml-auto" : "bg-gray-800"
            }`}
          >
            <ReactMarkdown>{msg.content}</ReactMarkdown>

            {msg.sources && (
              <div className="mt-3 text-sm text-gray-300">
                <p className="font-semibold">Sources:</p>

                {msg.sources.map((source, i) => (
                  <div key={i}>{source.source}</div>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="bg-gray-800 p-4 rounded-xl w-fit">Thinking...</div>
        )}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something about the PDF..."
          className="flex-1 p-3 rounded-lg bg-gray-800 outline-none"
        />

        <button
          onClick={handleAsk}
          className="bg-green-600 px-5 rounded-lg hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
