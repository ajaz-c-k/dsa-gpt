import chromadb


client = chromadb.PersistentClient(
    path="./chroma_db"
)


collection = client.get_or_create_collection(
    name="dsa_knowledge"
)


def add_knowledge(
    document_id: str,
    document: str,
    embedding: list[float],
    metadata: dict
):

    collection.add(
        ids=[document_id],
        documents=[document],
        embeddings=[embedding],
        metadatas=[metadata]
    )


def search_knowledge(
    query_embedding: list[float],
    number_of_results: int = 3
):

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=number_of_results
    )

    return results