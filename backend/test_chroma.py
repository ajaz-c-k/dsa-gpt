from services.embedding_service import create_embedding
from services.vector_store import add_knowledge


document = """
Binary Search is an efficient searching algorithm used to find
a target value in a sorted array.
"""

embedding = create_embedding(document)

add_knowledge(
    document_id="binary_search_1",
    document=document,
    embedding=embedding,
    metadata={
        "topic": "Binary Search",
        "source": "binary_search.md"
    }
)

print("Knowledge stored successfully in ChromaDB!")