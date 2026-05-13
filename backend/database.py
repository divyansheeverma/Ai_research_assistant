from langchain_community.vectorstores import Chroma
from .embeddings import embedding_model

DB_DIR = "chroma_db"


def get_vector_db():

    vectordb = Chroma(
        persist_directory=DB_DIR,
        embedding_function=embedding_model
    )

    return vectordb


def create_vector_db(documents):

    vectordb = Chroma.from_documents(
        documents=documents,
        embedding=embedding_model,
        persist_directory=DB_DIR
    )

  

    return vectordb