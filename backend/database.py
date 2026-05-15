from langchain_community.vectorstores import Chroma
from .embeddings import embedding_model
import os
import shutil

DB_DIR = "chroma_db"


def get_vector_db():
    """
    Load existing Chroma database
    """

    if not os.path.exists(DB_DIR):
        os.makedirs(DB_DIR)

    vectordb = Chroma(
        persist_directory=DB_DIR,
        embedding_function=embedding_model
    )

    return vectordb


def create_vector_db(documents):
    """
    Create fresh vector database from documents
    """

    # Delete old DB if exists
    if os.path.exists(DB_DIR):
        shutil.rmtree(DB_DIR)

    vectordb = Chroma.from_documents(
        documents=documents,
        embedding=embedding_model,
        persist_directory=DB_DIR
    )

    return vectordb


def add_documents_to_db(documents):
    """
    Add new documents without deleting old ones
    """

    vectordb = get_vector_db()

    vectordb.add_documents(documents)

    return vectordb


def delete_database():
    """
    Delete entire vector database
    """

    if os.path.exists(DB_DIR):
        shutil.rmtree(DB_DIR)

    return True


def database_exists():
    """
    Check if DB already exists
    """

    return os.path.exists(DB_DIR)