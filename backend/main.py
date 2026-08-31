from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from services.llm_service import generate_answer
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


@app.get("/")
def home():
    return {"message": "DSA-GPT backend is running!"}


@app.post("/ask")
def ask_question(data: Question):

    answer = generate_answer(data.question)

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
