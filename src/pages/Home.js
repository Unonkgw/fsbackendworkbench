import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const proceedPortfolio = () => {
    navigate("/portfolio");
  };

  const proceedRecipe = () => {
    navigate("/recipe");
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Hello, World!</h1>
      <div className="d-flex justify-content-center gap-3">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={proceedPortfolio}
        >
          My Portfolio
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={proceedRecipe}
        >
          My Recipe
        </button>
      </div>
    </div>
  );
}

export default Home;
