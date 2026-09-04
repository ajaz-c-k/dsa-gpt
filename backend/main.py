from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from services.embedding_service import create_embedding
from services.llm_service import generate_answer
from services.vector_store import search_knowledge
from database.connection import get_problems


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Question(BaseModel):
    question: str
    mode: str = "normal"
    hint_level: int = 0


@app.get("/")
def home():

    return {
        "message": "DSA-GPT backend is running!"
    }


@app.post("/ask")
def ask_question(data: Question):

    query_embedding = create_embedding(
        data.question
    )

    relevant_knowledge = search_knowledge(
        query_embedding,
        number_of_results=3
    )

    print("\n========== RAG DEBUG ==========")
    print("USER QUESTION:")
    print(data.question)

    print("\nRETRIEVED KNOWLEDGE:")
    for knowledge in relevant_knowledge:
        print(knowledge)

    print("\n================================\n")

    answer = generate_answer(
        data.question,
        relevant_knowledge,
        mode=data.mode,
        hint_level=data.hint_level
    )

    return {
        "answer": answer
    }


@app.get("/problems")
def get_all_problems():

    problems = get_problems()

    return {
        "problems": [
            {
                "id": problem[0],
                "title": problem[1],
                "description": problem[2],
                "difficulty": problem[3],
                "topic": problem[4]
            }
            for problem in problems
        ]
    }