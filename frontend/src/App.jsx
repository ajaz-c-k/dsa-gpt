
import { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function askDSAGPT() {
    try {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
        }),
      });

      const data = await response.json();

      setAnswer(data.answer);
    } catch (error) {
      console.error("Error:", error);
      setAnswer("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="app">

      <header className="header">
        <div className="logo">DSA-GPT</div>

        <nav>
          <span>Progress</span>
        </nav>
      </header>

      <main className="hero">

        <p className="subtitle">AI-POWERED DSA LEARNING</p>

        <h1>Your AI DSA Tutor</h1>

        <p className="description">
          Learn Data Structures and Algorithms,
          practice problems, and prepare for technical interviews.
        </p>

        <div className="question-container">

          <textarea
            className="question-box"
            placeholder="Ask a DSA question..."
            rows="6"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />

          <button
            className="ask-button"
            onClick={askDSAGPT}
          >
            Ask DSA-GPT
          </button>

        </div>

        <section className="answer-section">

          <h2>AI Tutor</h2>

          <div className="answer-box">
            <p>{answer || "Your answer will appear here..."}</p>
          </div>

        </section>

      </main>

    </div>
  );
}

export default App;
