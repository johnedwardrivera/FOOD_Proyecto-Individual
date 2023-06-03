import { useDispatch, useSelector } from "react-redux";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailRecipes } from "../../redux/actions/actions";  
import { Link } from 'react-router-dom'
import style from './Details.module.css' 
import img4 from '../../img/cosina.gif'
const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detailRecipes = useSelector((state) => state.detailRecipe);
  console.log("detalle", detailRecipes);
  useEffect(() => {
    dispatch(getDetailRecipes(id));
  }, [dispatch, id]);
  return (
    <> 
    {
      detailRecipes.length > 0 ?  
      <div className={style.container}> 
      <div className={style.card} key={detailRecipes.id}>
        <p>{detailRecipes[0].id}</p>
        <img src={detailRecipes[0].image} alt="" />
        <h2>{detailRecipes[0].title}</h2> 
        <h3>{detailRecipes[0].diets}</h3> 
        <p>{detailRecipes[0].healthScore}</p>  
        <p>{detailRecipes[0].summary}</p>
        <h5 >{ Array.isArray(detailRecipes[0].analyzedInstructions) ? detailRecipes[0].analyzedInstructions.map(e => e.steps.map(f => f.step)) : detailRecipes.analyzedInstructions }</h5> 
        <Link to={'/homepage'}><button className={style.btn}>Homepage</button></Link>
        </div>      
      </div>: 
        <div> <img src={img4} alt="" /> </div>

    }
  </>
  );
};
export default Details;
