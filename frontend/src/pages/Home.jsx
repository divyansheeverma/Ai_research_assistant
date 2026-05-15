import { useState } from "react";
import UploadBox from "../components/UploadBox";
import ChatBox from "../components/ChatBox";

const Home = () => {
  const [pdfUploaded, setPdfUploaded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8">
          AI Research Assistant
        </h1>

        <UploadBox setPdfUploaded={setPdfUploaded} />

        {pdfUploaded && <ChatBox />}
      </div>
    </div>
  );
};

export default Home;
