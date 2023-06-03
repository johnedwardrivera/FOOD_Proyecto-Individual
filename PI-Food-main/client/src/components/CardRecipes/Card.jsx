import Loading from '../Loading/Loading'
import { useDispatch, useSelector } from "react-redux";
import { React, useEffect, useState } from "react";
import { getRecipes } from "../../redux/actions/actions";
import Paginado from "./Paginado";
import style from "./Card.module.css";
import { Link } from "react-router-dom"; 
import {deleteRecipes} from '../../redux/actions/actions' 

const Card = () => {
  const dispatch = useDispatch(); 
  const store = useSelector(state => state)
  const allRecipes = useSelector((state) => state.getRecipes);
  console.log("mostrando todas las recetas", allRecipes);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setrecipesPerPage] = useState(9);
  const indexLastRecipe = currentPage * recipesPerPage;
  const indexFirstRecipe = indexLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  }; 
  function handleDelete(id){
    dispatch(deleteRecipes(id))  
    alert('Delete!')
  }

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  return (
    <>
      
      <div className={style.container}>
        {
         store.loading ? <Loading/> :
        currentRecipes.map((e) => {
          return (
            <div className={style.card} key={e.id}>
              <p>{e?.id}</p>
              <img src={e?.image} alt="" />
              <Link to={`/details/${e?.id}`}>
                <h2>{e?.title}</h2>
              </Link>
              <div className={style.tipes} key={e.id}>
                {e?.diets.map((t) => (
                  <h5> {t?.name}</h5>
                ))}
              </div> 
              <Link to={`/edit/${e?.id}`}>update recipes</Link>
              <button className={style.btn} onClick={() => handleDelete(e?.id)} >delete x</button>  
              
            </div>  
            
          );
        })}
      </div>  
      <br></br>
      <div>
        <Paginado
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado} 
        />
      </div>
    </>
  );
};

export default Card;
