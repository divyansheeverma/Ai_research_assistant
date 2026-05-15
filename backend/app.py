from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from .rag_pipeline import process_pdf, ask_question
from fastapi.responses import StreamingResponse

import shutil
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/")
def home():
    return {"message": "AI Research Assistant Running"}


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    process_pdf(file_path)

    return {
        "message": "PDF uploaded successfully",
        "filename": file.filename
    }


@app.post("/chat")
async def chat(data: dict):

    question = data.get("question")

    response = ask_question(question)

    
    return response
@app.post("/stream-chat")
async def stream_chat(data: dict):

    async def generate():

        response = ask_question(data["question"])

        for word in response.split():
            yield word + " "

    return StreamingResponse(generate())
@app.post("/upload")
async def upload(files: list[UploadFile]):

    for file in files:

        contents = await file.read()

        with open(file.filename, "wb") as f:
            f.write(contents)

        process_pdf(file.filename)

    return {"message": "Files uploaded"}