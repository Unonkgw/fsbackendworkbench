import React, {useState, useEffect} from "react";
import { useNavigate, generatePath } from "react-router-dom";
import Axios from "axios";


function MealView() {

    const [recipe, setRecipe] = useState([]);
    const [clickedRow, setClickedRow] = useState(0);

    const selectidmeal = (idmeal) => {
        setClickedRow(idmeal);
    }

    console.log(clickedRow);

    const navigate = useNavigate();
    const gotoupdate = () => {
        let idmeal = clickedRow;
        if (idmeal === 0) {
            alert("Select a meal first to update");
        }
        else {
            navigate(generatePath("/updatemeal/:idmeal", {idmeal}));
        }
    }


    useEffect(() => {
        Axios.get("http://localhost:8000/viewmeals", { withCredentials: true })
        .then( res => {
            console.log(res.data);
            setRecipe(res.data);
        })
        .catch(error => {
            console.log(error);
        })
    }, []);


    return (    
    <div>
      <h1>List of Meals</h1>
      <button type="button" class="btn btn-outline-info" onClick={gotoupdate}>Update Meal</button>      
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">IDMEAL</th>
            <th scope="col">MEAL NAME</th>
            <th scope="col">CATEGORY</th>
            <th scope="col">AREA</th>
            <th scope="col">INSTRUCTIONS</th>
          </tr>
        </thead>
        <tbody>
          {recipe.map((recipes, index) => (
            <tr 
              key={index} 
              className={clickedRow === recipes.idmeal ? "table-success" : "table-primary"}
              onClick={() => selectidmeal(recipes.idmeal)}
            >
              <th scope="row">{recipes.idmeal} - {index}</th>
              <td>{recipes.meal}</td>
              <td>{recipes.category}</td>
              <td>{recipes.area}</td>
              <td>{recipes.instructions}</td>
            </tr>   
          ))}
        </tbody>
      </table>
    </div>
  );

}

export default MealView;