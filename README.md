# 🚀 AI Research Assistant

An AI-powered Research Assistant built using **FastAPI, React, LangChain, ChromaDB, and Groq LLM** that allows users to upload PDFs and ask questions directly from the document using Retrieval-Augmented Generation (RAG).

---

# ✨ Features

✅ Upload PDF documents  
✅ Extract and split PDF text  
✅ Store embeddings using ChromaDB  
✅ Semantic search with HuggingFace embeddings  
✅ AI-powered question answering using Groq LLM  
✅ Modern React frontend with chat UI  
✅ Source citation support  
✅ FastAPI backend with REST APIs  
✅ Responsive UI with TailwindCSS  

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios
- Framer Motion

## Backend
- FastAPI
- LangChain
- Groq API
- ChromaDB
- HuggingFace Embeddings
- PyPDF

---

# 📂 Project Structure

```bash
Ai-Assistant/
│
├── backend/
│   ├── app.py
│   ├── rag_pipeline.py
│   ├── pdf_loader.py
│   ├── database.py
│   ├── embeddings.py
│   ├── requirements.txt
│   └── uploads/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatMessage.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .env
├── .gitignore
└── README.md
```

---

# ⚙️ Backend Setup

## 1️⃣ Create Virtual Environment

```bash
python -m venv venv
```

## 2️⃣ Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Mac/Linux

```bash
source venv/bin/activate
```

---

# 📦 Install Dependencies

```bash
pip install fastapi==0.115.0 uvicorn==0.30.6 langchain==0.2.16 langchain-core==0.2.38 langchain-community==0.2.16 langchain-groq==0.1.9 chromadb==0.5.5 sentence-transformers pypdf python-multipart python-dotenv
```

---

# 🔑 Environment Variables

Create a `.env` file inside the root directory:

```env
GROQ_API_KEY=your_groq_api_key
MODEL_NAME=llama-3.1-8b-instant

DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

# ▶️ Run Backend Server

```bash
python -m uvicorn backend.app:app --reload
```

Backend will run on:

```bash
http://127.0.0.1:8000
```

Swagger Docs:

```bash
http://127.0.0.1:8000/docs
```

---

# 💻 Frontend Setup

## Install Dependencies

```bash
npm install
```

## Additional Packages

```bash
npm install axios react-router-dom react-markdown framer-motion
```

---

# ▶️ Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🔥 API Endpoints

## Upload PDF

```http
POST /upload
```

### Form Data

| Key  | Type |
|------|------|
| file | PDF |

---

## Ask Questions

```http
POST /chat
```

### Request Body

```json
{
  "question": "What is this document about?"
}
```

### Response

```json
{
  "answer": "AI generated answer",
  "sources": [
    {
      "source": "uploads/sample.pdf"
    }
  ]
}
```

---

# 🧠 RAG Pipeline Flow

```text
PDF Upload
   ↓
Text Extraction
   ↓
Chunking
   ↓
Embeddings Creation
   ↓
Store in ChromaDB
   ↓
Semantic Retrieval
   ↓
Groq LLM Response
```

---

# 📸 UI Features

✨ Modern Chat Interface  
✨ Animated Components  
✨ Typing Loader  
✨ Responsive Design  
✨ Source Display  
✨ PDF Upload Section  

---



# 🧪 Sample Questions

```text
What is this document about?

Summarize the PDF.

What skills are mentioned?

Give key insights from the document.
```

---

# 👨‍💻 Author

### Divyanshee Verma

- IIT Patna Graduate
- Full Stack Developer
- AI/ML Enthusiast

---

# ⭐ If you like this project

Give it a ⭐ on GitHub!

---
