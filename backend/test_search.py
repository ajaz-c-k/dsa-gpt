from services.embedding_service import create_embedding
from services.vector_store import search_knowledge


question = "What is binary search?"

query_embedding = create_embedding(
    question
)

results = search_knowledge(
    query_embedding,
    number_of_results=3
)

print("Search completed!")

print("\nRetrieved knowledge:")

for result in results:
    print(result)