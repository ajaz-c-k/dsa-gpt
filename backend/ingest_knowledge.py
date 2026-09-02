from pathlib import Path

from services.embedding_service import create_embedding
from services.vector_store import add_knowledge


knowledge_folder = Path("knowledge")


for file_path in knowledge_folder.glob("*.md"):

    document = file_path.read_text(encoding="utf-8")

    embedding = create_embedding(document)

    add_knowledge(
        document_id=file_path.stem,
        document=document,
        embedding=embedding,
        metadata={
            "source": file_path.name
        }
    )

    print(f"Stored: {file_path.name}")