from services.embedding_service import create_embedding
from services.vector_store import search_knowledge


question = "How can I efficiently find an element in a sorted array?"


query_embedding = create_embedding(question)


results = search_knowledge(
    query_embedding,
    number_of_results=1
)


print("Search completed!")
print()
print("Retrieved knowledge:")
print(results["documents"])