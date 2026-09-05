import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Link,
  Routes,
  Route,
} from "react-router-dom";

import Problems from "./Problems.jsx";

import "./App.css";


function Tutor() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hintLevel, setHintLevel] = useState(0);


  async function askDSAGPT() {

    if (!question.trim()) {
      setError("Please enter a DSA question.");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");
    setHintLevel(0);

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/ask`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
            mode: "normal",
            hint_level: 0,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to get a response from the server."
        );
      }

      const data = await response.json();

      setAnswer(data.answer);

    } catch (error) {

      console.error("Error:", error);

      setError(
        "Something went wrong. Please try again."
      );

    } finally {

      setLoading(false);

    }
  }


  async function getHint() {

    if (!question.trim()) {
      setError(
        "Please enter a DSA question first."
      );
      return;
    }

    const nextLevel = hintLevel + 1;

    if (nextLevel > 3) {
      return;
    }

    setLoading(true);
    setError("");

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/ask`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
            mode: "hint",
            hint_level: nextLevel,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to get a hint from the server."
        );
      }

      const data = await response.json();

      setAnswer(data.answer);
      setHintLevel(nextLevel);

    } catch (error) {

      console.error("Error:", error);

      setError(
        "Something went wrong while getting the hint."
      );

    } finally {

      setLoading(false);

    }
  }


  function clearConversation() {

    setQuestion("");
    setAnswer("");
    setError("");
    setHintLevel(0);

  }


  return (

    <div className="app">

      <header className="header">

        <div className="logo">
          DSA-GPT
        </div>

        <nav>

          <Link to="/problems">
            Practice Problems
          </Link>

        </nav>

      </header>


      <main className="hero">

        <p className="subtitle">
          AI-POWERED DSA LEARNING
        </p>

        <h1>
          Your AI DSA Tutor
        </h1>

        <p className="description">

          Learn Data Structures and Algorithms,
          practice problems, and prepare for
          technical interviews.

        </p>


        <div className="question-container">

          <textarea
            className="question-box"
            placeholder="Ask a DSA question..."
            rows="6"
            value={question}
            onChange={(event) =>
              setQuestion(event.target.value)
            }
          />


          <div className="button-container">

            <button
              className="ask-button"
              onClick={askDSAGPT}
              disabled={loading}
            >

              {loading
                ? "Thinking..."
                : "Ask DSA-GPT"}

            </button>


            <button
              className="hint-button"
              onClick={getHint}
              disabled={
                loading || hintLevel >= 3
              }
            >

              {hintLevel === 0
                ? "💡 Give me a hint"
                : hintLevel < 3
                ? "💡 Another hint"
                : "💡 Hint limit reached"}

            </button>


            <button
              className="clear-button"
              onClick={clearConversation}
              disabled={loading}
            >

              Clear

            </button>

          </div>

        </div>


        {error && (

          <p className="error-message">
            {error}
          </p>

        )}


        <section className="answer-section">

          <h2>
            AI Tutor
          </h2>

          <div className="answer-box">

            {loading ? (

              <p>
                DSA-GPT is thinking...
              </p>

            ) : answer ? (

              <div className="markdown-content">

                <ReactMarkdown>
                  {answer}
                </ReactMarkdown>

              </div>

            ) : (

              <p>
                Your answer will appear here...
              </p>

            )}

          </div>

        </section>

      </main>

    </div>
  );
}


function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Tutor />}
      />

      <Route
        path="/problems"
        element={<Problems />}
      />

    </Routes>

  );

}


export default App;