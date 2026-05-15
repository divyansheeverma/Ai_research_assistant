import { FaRobot } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-slate-950 border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaRobot className="text-2xl text-blue-500" />

          <h1 className="text-2xl font-bold text-white">
            AI Research Assistant
          </h1>
        </div>

        <div className="text-gray-400 text-sm">Powered by Groq + LangChain</div>
      </div>
    </nav>
  );
};

export default Navbar;
