import { useNavigate } from "react-router-dom";

function Portfolio() {
  const navigate = useNavigate();

  const proceedHome = () => {
    navigate("/home");
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">This Is My Portfolio</h1>
      <button
        type="button"
        className="btn btn-success btn-lg"
        onClick={proceedHome}
      >
        My Home
      </button>
    </div>
  );
}

export default Portfolio;
