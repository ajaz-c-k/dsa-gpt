from services.embedding_service import create_embedding


text = "Binary Search works on sorted arrays."

vector = create_embedding(text)

print("Embedding created successfully!")
print("Number of dimensions:", len(vector))
print("First 5 values:", vector[:5])