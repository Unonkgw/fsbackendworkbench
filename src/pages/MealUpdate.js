import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";

function MealUpdate() {
  const { idmeal } = useParams();
  const [recipe, setRecipe] = useState({});
  const [mealName, setMealName] = useState("");
  const [mealCategory, setMealCategory] = useState("");
  const [mealArea, setMealArea] = useState("");
  const [mealInstructions, setMealInstructions] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    Axios.get(`http://localhost:8000/getmeal/${idmeal}`, { withCredentials: true })
      .then((res) => {
        // console.log(res.data[0]);
        // setRecipe(res.data[0]);


        let mydata = res.data[0];
        setMealName(mydata.meal);
        setMealCategory(mydata.category);
        setMealArea(mydata.area);
        setMealInstructions(mydata.instructions);   
      })
      .catch((error) => {
        console.log(error);
      });
  }, [idmeal]);

    const back = () => {
        navigate("/viewmeals");  
    }


  const submitdata = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:8000/updatemeal", {
      idmeal: idmeal,
      mealname: mealName,
      mealcategory: mealCategory,
      mealarea: mealArea,
      mealinstructions: mealInstructions,
    }).then(res => {
      alert(res.data.message);
      navigate("/viewmeals");
      console.log(res)
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
        <h1>This is my Recipe {idmeal}</h1>
        <h2>{recipe.meal} - {idmeal}</h2>
        <button className="btn btn-secondary mb-3" onClick={back}> Go Back </button>
        <div>
          <h2>Update Meal</h2>
          <form>
            <label>Meal Name</label>
            <input 
              type="text" 
              className= 'form-control' 
              required
              maxLength={25}
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
            />
            <label>Meal Category</label>
            <input 
              type="text" 
              className= 'form-control' 
              required
              maxLength={25}
              value={mealCategory}
              onChange={(e) => setMealCategory(e.target.value)}
            />
            <label>Meal Area</label>
            <input 
              type="text" 
              className= 'form-control' 
              required
              maxLength={25}
              value={mealArea}
              onChange={(e) => setMealArea(e.target.value)}
            />
            <label>Meal Instructions</label>
            <input 
              type="text" 
              className= 'form-control' 
              required
              maxLength={100}
              value={mealInstructions}
              onChange={(e) => setMealInstructions(e.target.value)}
            />
            <button className="btn btn-primary mt-3"  onClick={submitdata}>
              Submit
            </button>
          </form>
        </div>
    </div>

  );
}

export default MealUpdate;
