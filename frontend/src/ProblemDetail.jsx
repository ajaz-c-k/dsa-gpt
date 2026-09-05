import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./ProblemDetail.css";


function ProblemDetail() {

  const { id } = useParams();

  const [problem, setProblem] = useState(null);
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

        const selectedProblem = data.problems.find(
          (problem) => problem.id === Number(id)
        );

        if (!selectedProblem) {
          throw new Error("Problem not found.");
        }

        setProblem(selectedProblem);

      })

      .catch((error) => {

        console.error("Error:", error);

        setError("Unable to load this problem.");

      })

      .finally(() => {

        setLoading(false);

      });

  }, [id]);


  if (loading) {

    return (
      <div className="problem-detail-page">
        <p>Loading problem...</p>
      </div>
    );

  }


  if (error) {

    return (
      <div className="problem-detail-page">

        <p className="problem-error">
          {error}
        </p>

        <Link to="/problems">
          ← Back to Problems
        </Link>

      </div>
    );

  }


  return (

    <div className="problem-detail-page">

      <header className="problem-detail-header">

        <Link to="/problems">
          ← Back to Problems
        </Link>

      </header>


      <main className="problem-detail-container">

        <div className="problem-title-row">

          <h1>
            {problem.title}
          </h1>

          <div className="problem-meta">

            <span className="difficulty">
              {problem.difficulty}
            </span>

            <span className="topic">
              {problem.topic}
            </span>

          </div>

        </div>


        <section className="problem-description">

          <h2>
            Problem
          </h2>

          <p>
            {problem.description}
          </p>

        </section>


        <section className="solve-section">

          <h2>
            Your Approach
          </h2>

          <textarea
            className="approach-box"
            placeholder="Explain how you would solve this problem..."
            rows="8"
          />

          <button className="start-solving-button">
            Start Solving
          </button>

        </section>

      </main>

    </div>

  );

}


export default ProblemDetail;