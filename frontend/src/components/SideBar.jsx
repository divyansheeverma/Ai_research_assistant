// src/components/Sidebar.jsx

import { FaFilePdf } from "react-icons/fa";
import PropTypes from "prop-types";

const Sidebar = ({ file, setFile, uploadPDF, loading }) => {
  return (
    <div className="w-72 bg-slate-900 border-r border-slate-800 p-4">
      <h2 className="text-xl font-semibold mb-6">Workspace</h2>

      {/* PDF CARD */}
      <div className="bg-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <FaFilePdf className="text-red-500 text-xl" />

          <div>
            <p className="font-medium">Uploaded PDF</p>

            <p className="text-sm text-gray-400 break-all">
              {file ? file.name : "No PDF Uploaded"}
            </p>
          </div>
        </div>
      </div>

      {/* FILE INPUT */}
      <div className="mt-6">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-300
          file:mr-4
          file:py-2
          file:px-4
          file:rounded-lg
          file:border-0
          file:text-sm
          file:font-semibold
          file:bg-blue-600
          file:text-white
          hover:file:bg-blue-700"
        />
      </div>

      {/* UPLOAD BUTTON */}
      <button
        onClick={uploadPDF}
        disabled={loading}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold transition"
      >
        {loading ? "Uploading..." : "Upload PDF"}
      </button>

      {/* NEW CHAT BUTTON */}
      <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition">
        New Chat
      </button>
    </div>
  );
};

Sidebar.propTypes = {
  file: PropTypes.object,
  setFile: PropTypes.func.isRequired,
  uploadPDF: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Sidebar;
