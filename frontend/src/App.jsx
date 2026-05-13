import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const uploadPDF = async () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {
      setLoading(true);

      await axios.post("http://127.0.0.1:8000/upload", formData);

      alert("PDF Uploaded Successfully");
    } catch (error) {
      console.log(error);

      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  const askQuestion = async () => {
    if (!question.trim()) return;

    const userMessage = {
      type: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      const response = await axios.post("http://127.0.0.1:8000/chat", {
        question: question,
      });

      const botMessage = {
        type: "bot",
        text: response.data.answer,
        sources: response.data.sources,
      };

      setMessages((prev) => [...prev, botMessage]);

      setQuestion("");
    } catch (error) {
      console.log(error);

      alert("Error getting response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          AI Research Assistant
        </h1>

        <div className="bg-slate-800 p-6 rounded-xl mb-6">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4"
          />

          <button
            onClick={uploadPDF}
            className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Upload PDF
          </button>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 h-[500px] overflow-y-auto mb-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${
                msg.type === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-4 rounded-xl max-w-[80%] ${
                  msg.type === "user" ? "bg-blue-600" : "bg-slate-700"
                }`}
              >
                {msg.text}
              </div>

              {msg.sources && (
                <div className="text-sm text-gray-400 mt-2">
                  Sources:
                  {msg.sources.map((src, i) => (
                    <div key={i}>{src.source}</div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {loading && <div className="text-gray-400">AI is thinking...</div>}
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-slate-800 border border-slate-700"
          />

          <button
            onClick={askQuestion}
            className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
