import os

import psycopg
from dotenv import load_dotenv


load_dotenv()


DATABASE_URL = os.getenv("DATABASE_URL")


def get_connection():
    return psycopg.connect(DATABASE_URL)


def get_problems():
    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id, title, description, difficulty, topic
                FROM problems
                ORDER BY id;
                """
            )

            rows = cursor.fetchall()

            return rows

    finally:
        connection.close()