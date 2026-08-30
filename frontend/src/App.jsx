import "./App.css";

function App() {
  return (
    <div className="app">

      <header className="header">
        <div className="logo">DSA-GPT</div>
        <div className="nav-link">Progress</div>
      </header>

      <main className="hero">

        <h1>Your AI DSA Tutor</h1>

        <p>
          Learn Data Structures and Algorithms.
          Practice smarter. Prepare for interviews.
        </p>

        <textarea
          className="question-box"
          placeholder="Ask a DSA question..."
          rows="6"
        />

        <button className="ask-button">
          Ask DSA-GPT
        </button>

        <section className="answer-section">
          <h2>AI Tutor</h2>

          <div className="answer-box">
            Your answer will appear here...
          </div>
        </section>

      </main>

    </div>
  );
}

export default App;