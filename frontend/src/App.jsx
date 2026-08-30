import "./App.css";

function App() {
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

        <h1>
          Your AI DSA Tutor
        </h1>

        <p className="description">
          Learn Data Structures and Algorithms,
          practice problems, and prepare for technical interviews.
        </p>

        <div className="question-container">

          <textarea
            className="question-box"
            placeholder="Ask a DSA question..."
            rows="6"
          />

          <button className="ask-button">
            Ask DSA-GPT
          </button>

        </div>

        <section className="answer-section">

          <h2>AI Tutor</h2>

          <div className="answer-box">
            <p>
              Your answer will appear here...
            </p>
          </div>

        </section>

      </main>

    </div>
  );
}

export default App;