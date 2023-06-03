import { useState } from "react";
import { Link } from "react-router-dom";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./HomePage.module.css";
import { getRecipesByName } from "../../redux/actions/actions";
import { filterRecipesByTypeDiet } from "../../redux/actions/actions";
import { orderRecipes } from "../../redux/actions/actions";
import { ordenHealthScore } from "../../redux/actions/actions";

import Card from "../CardRecipes/Card";
const HomePage = () => {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.title);
  const [searchString, setSearchString] = useState("");
  function handleChange(event) {
    setSearchString(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getRecipesByName(searchString));
  }
  function handleFilterTypeDiet(event) {
    dispatch(filterRecipesByTypeDiet(event.target.value));
    console.log("hola", event.target.value);
  }
  function handlechangeorder(event) {
    dispatch(orderRecipes(event.target.value));
  }
  function handleChangeHealthScore(event) {
    dispatch(ordenHealthScore(event.target.value));
  }
  return (
    <>
      <div className={style.navbar_container}>
        <div className={style.grid}>
          <div className={style.searchbox}>
            <input
              className={style.input}
              type="search"
              value={title}
              onChange={handleChange}
              placeholder="Enter a Recipes..."
            />
            <button className={style.btn} type="submit" onClick={handleSubmit}>
              buscar
            </button>
          </div>
          <div>
            <Link to="/create">
              <button className={style.boton}>Create a New Recipes</button>
            </Link>
          </div>

          <div>
            <select onChange={handleFilterTypeDiet} className={style.select}>
              <option value="All">todas las recetas</option>
              <option value="gluten free">Gluten Free</option>
              <option value="ketogenic">Ketogenic</option>
              <option value="vegetarian">Vegetarian </option>
              <option value="lacto-vegetarian">Lacto-Vegetarian </option>
              <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="pescatarian">Pescatarian</option>
              <option value="paleolithic">Paleolithic</option>
              <option value="primal">Primal</option>
              <option value="whole 30">Whole 30</option>
            </select>
          </div>
          <div>
            <select className={style.select} onChange={handlechangeorder}>
              <option value="asc">(A - Z)</option>
              <option value="desc">(Z - A)</option>
            </select>
          </div>
          <div>
            <select className={style.select} onChange={handleChangeHealthScore}>
              <option value="asc">healthScoreMayor</option>
              <option value="desc">healthScoreMenor</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <Card></Card>
      </div>
    </>
  );
};
export default HomePage;
