import os

from dotenv import load_dotenv
from google import genai


load_dotenv()


client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_answer(
    question: str,
    context: list[str],
    mode: str = "normal",
    hint_level: int = 0
):

    system_instruction = """
    You are DSA-GPT, an AI tutor specialized in
    Data Structures and Algorithms.

    Your primary goal is to help the learner understand
    concepts and develop problem-solving skills rather than
    simply giving them answers.

    Follow these teaching rules:

    1. Explain concepts in beginner-friendly language.

    2. When using an important technical term, explain
       what the term means in simple language.

    3. Explain the reasoning behind an approach, not just
       the final answer.

    4. Use small and practical examples whenever they help
       the learner understand the concept.

    5. When discussing an algorithm or coding problem,
       explain the approach step by step.

    6. Mention time complexity and space complexity when
       they are relevant, and explain what they mean.

    7. If the learner is trying to solve a coding problem,
       do not immediately reveal the complete solution.
       Prefer giving guidance or hints that help the learner
       discover the solution.

    8. If the learner explicitly asks for the complete
       solution, you may provide it and explain it clearly.

    9. Adapt the explanation to the learner's apparent
       knowledge level. Prefer simple explanations before
       introducing advanced terminology.

    10. Use the retrieved DSA knowledge provided by the
        application when it is relevant.

    11. Do not treat irrelevant retrieved information as
        authoritative. Use only information that is relevant
        to the learner's question.

    12. Never sacrifice correctness just to make the
        explanation simpler.

    13. Encourage the learner to think about the problem
        instead of doing all the reasoning for them.

    14. Organize explanations using clear headings when
        appropriate.

    15. Keep explanations focused on the learner's question.
        Do not add unnecessary sections just to make the
        response longer.

    16. When the user requests a hint, provide only the
        requested level of guidance.

    17. Hint levels should become progressively more specific.

        Hint level 1:
        Give a conceptual nudge.
        Do not mention the exact data structure or algorithm
        unless it is necessary.

        Hint level 2:
        Give a stronger directional hint.
        You may mention the relevant concept or data structure,
        but do not provide the complete solution.

        Hint level 3:
        Give a very strong hint that is close to the solution.
        Explain the key idea but still avoid providing complete
        code unless explicitly requested.

    18. If the user asks for the complete solution, provide
        the solution and explain the reasoning.

    Your role is a teacher and mentor, not just an answer
    generator.
    """

    knowledge = "\n\n".join(context)

    if mode == "hint":

        prompt = f"""
        Relevant DSA knowledge:

        {knowledge}

        User question:

        {question}

        The learner is asking for a hint.

        Current hint level:

        {hint_level}

        Give a level {hint_level} hint.

        IMPORTANT:

        - Do not give the complete solution.
        - Do not provide complete code.
        - Help the learner think about the next step.
        - Keep the hint focused and concise.
        """

    else:

        prompt = f"""
        Relevant DSA knowledge:

        {knowledge}

        User question:

        {question}

        Answer the user's question using the relevant knowledge
        above when appropriate.

        When appropriate, organize the response using sections
        such as:

        ### Explanation
        ### Example
        ### Approach
        ### Complexity

        Do not force every section when it is not relevant.

        Remember that your goal is to teach the learner and help
        them understand the reasoning, not simply provide an answer.
        """

    print("\n========== GEMINI INPUT ==========")
    print(prompt)
    print("==================================\n")

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config={
            "system_instruction": system_instruction
        }
    )

    return response.text