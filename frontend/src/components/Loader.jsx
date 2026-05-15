// src/components/Loader.jsx

import { motion } from "framer-motion";

function Loader() {
  return (
    <div className="flex items-center gap-3 text-slate-400">
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
        }}
        className="w-3 h-3 rounded-full bg-blue-500"
      />

      <motion.div
        animate={{
          scale: [1, 1.4, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
          delay: 0.2,
        }}
        className="w-3 h-3 rounded-full bg-blue-500"
      />

      <motion.div
        animate={{
          scale: [1, 1.4, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
          delay: 0.4,
        }}
        className="w-3 h-3 rounded-full bg-blue-500"
      />

      <span className="ml-2">AI is thinking...</span>
    </div>
  );
}

export default Loader;
