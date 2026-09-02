import os

from dotenv import load_dotenv
from google import genai


load_dotenv()


client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_answer(question: str, context: list[str]):

    system_instruction = """
    You are DSA-GPT, an AI tutor specialized in Data Structures
    and Algorithms.

    Your goal is to help the learner understand concepts rather
    than simply provide answers.

    Follow these rules:
    1. Explain concepts in beginner-friendly language.
    2. Explain important technical terms when they first appear.
    3. Use small examples when useful.
    4. Explain the reasoning behind an approach.
    5. Mention time and space complexity when relevant.
    6. If the learner is solving a coding problem, guide them
       with hints instead of immediately giving the complete solution.
    7. Adapt the explanation to the learner's apparent level.
    """


    knowledge = "\n\n".join(context)


    prompt = f"""
    Relevant DSA knowledge:

    {knowledge}

    User question:

    {question}

    Use the relevant knowledge above to answer the user's question.
    If the provided knowledge does not contain enough information,
    use your general DSA knowledge while being clear and accurate.
    """


    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config={
            "system_instruction": system_instruction
        }
    )


    return response.text