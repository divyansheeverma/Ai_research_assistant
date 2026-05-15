// src/components/ChatMessage.jsx

import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ChatMessage = ({ msg }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${
        msg.type === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-5 py-4 shadow-lg ${
          msg.type === "user"
            ? "bg-blue-600 text-white"
            : "bg-slate-800 text-slate-100 border border-slate-700"
        }`}
      >
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{msg.text}</ReactMarkdown>
        </div>

        {msg.sources && msg.sources.length > 0 && (
          <div className="mt-4 border-t border-slate-600 pt-3">
            <p className="text-sm font-semibold text-slate-300 mb-2">Sources</p>

            <div className="space-y-1">
              {msg.sources.map((src, index) => (
                <div key={index} className="text-xs text-slate-400 break-all">
                  • {src.source}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

ChatMessage.propTypes = {
  msg: PropTypes.shape({
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    sources: PropTypes.array,
  }).isRequired,
};

export default ChatMessage;
