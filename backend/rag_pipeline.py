from langchain_ollama import OllamaLLM
from langchain.chains import RetrievalQA

from .pdf_loader import load_and_split_pdf
from .database import create_vector_db, get_vector_db


llm = OllamaLLM(
    model="tinyllama"
)


def process_pdf(file_path):

    docs = load_and_split_pdf(file_path)

    create_vector_db(docs)


def ask_question(question):

    vectordb = get_vector_db()

    retriever = vectordb.as_retriever(
        search_kwargs={"k": 4}
    )

    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        return_source_documents=True
    )

    result = qa_chain.invoke({
        "query": question
    })

    sources = []

    for doc in result["source_documents"]:

        sources.append({
            "source": doc.metadata.get(
                "source",
                "Unknown"
            )
        })

    return {
        "answer": result["result"],
        "sources": sources
    }