
import { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function askDSAGPT() {
    // Don't send an empty question
    if (!question.trim()) {
      setError("Please enter a DSA question.");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

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

      // Check whether the backend returned a successful response
      if (!response.ok) {
        throw new Error("Failed to get a response from the server.");
      }

      const data = await response.json();

      setAnswer(data.answer);
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
            disabled={loading}
          >
            {loading ? "Thinking..." : "Ask DSA-GPT"}
          </button>

        </div>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <section className="answer-section">

          <h2>AI Tutor</h2>

          <div className="answer-box">
            {loading ? (
              <p>DSA-GPT is thinking...</p>
            ) : answer ? (
              <p>{answer}</p>
            ) : (
              <p>Your answer will appear here...</p>
            )}
          </div>

        </section>

      </main>

    </div>
  );
}

export default App;
