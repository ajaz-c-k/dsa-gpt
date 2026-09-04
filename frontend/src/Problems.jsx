import { useEffect, useState } from "react";
import "./Problems.css";

function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/problems`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch problems.");
        }

        return response.json();
      })
      .then((data) => {
        setProblems(data.problems);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Unable to load problems.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="problems-page">

      <header className="problems-header">
        <div className="logo">DSA-GPT</div>

        <h1>Practice Problems</h1>

        <p>
          Practice Data Structures and Algorithms
          and improve your problem-solving skills.
        </p>
      </header>

      <main className="problems-container">

        {loading && (
          <p className="problems-status">
            Loading problems...
          </p>
        )}

        {error && (
          <p className="problems-error">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="problems-list">

            {problems.map((problem) => (
              <div
                className="problem-card"
                key={problem.id}
              >

                <div className="problem-info">

                  <h2>{problem.title}</h2>

                  <p>
                    {problem.description}
                  </p>

                </div>

                <div className="problem-meta">

                  <span className="difficulty">
                    {problem.difficulty}
                  </span>

                  <span className="topic">
                    {problem.topic}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

      </main>

    </div>
  );
}

export default Problems;