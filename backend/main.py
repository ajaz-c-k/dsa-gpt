from fastapi import FastAPI
from pydantic import BaseModel

from services.llm_service import generate_answer


app = FastAPI()


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