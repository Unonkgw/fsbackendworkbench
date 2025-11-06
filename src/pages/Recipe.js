import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Recipe.css";

function Recipe() {
  const [recipe, setRecipe] = useState({});
  const [copied, setCopied] = useState(false);

  const [mealName, setMealName] = useState("");
  const [mealCategory, setMealCategory] = useState("");
  const [mealArea, setMealArea] = useState("");
  const [mealInstructions, setMealInstructions] = useState("");





  useEffect(() => {
    Axios.get("http://localhost:8000/karaage", { withCredentials: true })
      .then((res) => {
        console.log(res.data[0]);
        setRecipe(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const copyIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    navigator.clipboard.writeText(ingredients.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const printRecipe = () => {
    window.print();
  };


  const submitdata = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8000/insertmeal", {
      mealname: mealName,
      mealcategory: mealCategory,
      mealarea: mealArea,
      mealinstructions: mealInstructions,
    }).then(res => {
      alert("Meal inserted successfully");
      console.log(res)
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
        <h1>This is my Recipe</h1>
        <h2>{recipe.meal}</h2>
        <div>
          <h2>Enter a New Meal</h2>
          <form>
            <label>Meal Name</label>
            <input 
              type="text" 
              className= 'form-control' 
              required
              maxLength={25}
              onChange={(e) => setMealName(e.target.value)}
            />
            <label>Meal Category</label>
            <input 
              type="text" 
              className= 'form-control' 
              required
              maxLength={25}
              onChange={(e) => setMealCategory(e.target.value)}
            />
            <label>Meal Area</label>
            <input 
              type="text" 
              className= 'form-control' 
              required
              maxLength={25}
              onChange={(e) => setMealArea(e.target.value)}
            />
            <label>Meal Instructions</label>
            <input 
              type="text" 
              className= 'form-control' 
              required
              maxLength={100}
              onChange={(e) => setMealInstructions(e.target.value)}
            />
            <button className="btn btn-primary mt-3"  onClick={submitdata}>
              Submit
            </button>
          </form>
        </div>
    </div>
    // <div className="recipe-page">
    //   <div className="recipe-hero">
    //     <div className="recipe-hero-text">
    //       <h1 className="recipe-title">{recipe.strMeal}</h1>
    //       <p className="recipe-category">
    //         {recipe.strArea} • {recipe.strCategory}
    //       </p>

    //       {recipe.strYoutube && (
    //         <a
    //           href={recipe.strYoutube}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="btn youtube"
    //         >
    //           Watch on YouTube
    //         </a>
    //       )}
    //     </div>

    //     {recipe.strMealThumb && (
    //       <img
    //         src={recipe.strMealThumb}
    //         alt={recipe.strMeal}
    //         className="recipe-image"
    //       />
    //     )}
    //   </div>

      
    //   <div className="recipe-content">
        
    //     <section className="ingredients-card">
    //       <h2>Ingredients</h2>
    //       <ul>
    //         {Array.from({ length: 20 }, (_, i) => {
    //           const ingredient = recipe[`strIngredient${i + 1}`];
    //           const measure = recipe[`strMeasure${i + 1}`];
    //           return (
    //             ingredient &&
    //             ingredient.trim() !== "" && (
    //               <li key={i}>
    //                 {measure} {ingredient}
    //               </li>
    //             )
    //           );
    //         })}
    //       </ul>

    //       <button onClick={copyIngredients} className="btn">
    //         {copied ? "Copied!" : "Copy Ingredients"}
    //       </button>
    //     </section>

        
    //     <section className="instructions">
    //       <h2>Instructions</h2>
    //       {recipe.strInstructions &&
    //         recipe.strInstructions
    //           .split(/\r?\n|\./)
    //           .filter((step) => step.trim() !== "")
    //           .map((step, index) => (
    //             <p key={index} className="instruction-step">
    //               <strong>Step {index + 1}:</strong> {step.trim()}
    //             </p>
    //           ))}

    //       <button onClick={printRecipe} className="btn">
    //         Print Recipe
    //       </button>
    //     </section>
    //   </div>
    // </div>
  );
}

export default Recipe;
