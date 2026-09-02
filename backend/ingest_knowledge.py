import os

from services.embedding_service import create_embedding
from services.vector_store import add_knowledge


KNOWLEDGE_FOLDER = "knowledge"


def ingest_knowledge():

    for filename in os.listdir(KNOWLEDGE_FOLDER):

        if not filename.endswith(".md"):
            continue

        file_path = os.path.join(
            KNOWLEDGE_FOLDER,
            filename
        )

        with open(
            file_path,
            "r",
            encoding="utf-8"
        ) as file:

            document = file.read()

        document_id = filename.replace(
            ".md",
            ""
        )

        embedding = create_embedding(
            document
        )

        metadata = {
            "source": filename,
            "type": "dsa_knowledge"
        }

        add_knowledge(
            document_id=document_id,
            document=document,
            embedding=embedding,
            metadata=metadata
        )

        print(
            f"Ingested: {filename}"
        )


if __name__ == "__main__":

    ingest_knowledge()