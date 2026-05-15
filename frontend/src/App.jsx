// src/App.jsx

import { useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ChatMessage from "./components/ChatMessage";
import Loader from "./components/Loader";

function App() {
  const [file, setFile] = useState(null);

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const API_URL = "http://127.0.0.1:8000";

  const uploadPDF = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {
      setLoading(true);

      await axios.post(`${API_URL}/upload`, formData);

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

      const response = await axios.post(`${API_URL}/chat`, {
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
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar
        file={file}
        setFile={setFile}
        uploadPDF={uploadPDF}
        loading={loading}
      />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="flex-1 p-6 overflow-hidden">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl h-full flex flex-col shadow-2xl">
            {/* CHAT AREA */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center text-slate-500 text-lg">
                  Upload a PDF and start asking questions
                </div>
              )}

              {messages.map((msg, index) => (
                <ChatMessage key={index} msg={msg} />
              ))}

              {loading && <Loader />}
            </div>

            {/* INPUT AREA */}
            <div className="border-t border-slate-800 p-4 flex gap-4">
              <input
                type="text"
                placeholder="Ask anything from your PDF..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    askQuestion();
                  }
                }}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />

              <button
                onClick={askQuestion}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
