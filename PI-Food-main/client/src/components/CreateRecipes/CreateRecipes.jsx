import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { React, useEffect } from "react";
import { getTypesDiets } from "../../redux/actions/actions";
import { postRecipes } from "../../redux/actions/actions"; 
import validation from './validation'
import style from "./CreateRecipes.module.css";
const CreateRecipes = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.TypesDiets);
  console.log("dietas", diets);

  const [input, setInput] = useState({
    title: "",
    summary: "",
    spoonacularScore: "",
    healthScore: "",
    analyzedInstructions: "",
    image: "",
    diets: [],
  }); 
  const [errors, setErrors] = useState({
    title: "",
    summary: "",
    spoonacularScore: "",
    healthScore: "",
    analyzedInstructions: "",
    image: "",
    diets: [],
  })
  useEffect(() => {
    dispatch(postRecipes());
    dispatch(getTypesDiets());
  }, []);
  const changeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    }) 
    setErrors(
      validation({
        ...input, 
        [e.target.name]: e.target.value,
      })
    )
  };
  const handleSelect = (e) => {
    e.preventDefault();
    if (!input.diets.includes(e.target.value)) {
      setInput({ ...input, diets: [...input.diets, e.target.value] });
    }
  };

  const handleDelete = (e) => {
    setInput({ ...input, diets: input.diets.filter((diet) => diet !== e) });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
        postRecipes(input) 
        ) 
        alert('Receta exitosa!')
    setInput({
      title: "",
      summary: "",
      spoonacularScore: "",
      healthScore: "",
      analyzedInstructions: "",
      image: "",
      diets: [],
    });
  };

  return (
    <>
      <div className={style.container}>
        <form className={style.formulario} onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              name="title"
              placeholder="title...."
              value={input.title}
              onChange={(e) => changeHandler(e)}
              className={style.input}
            /> 
            {errors.title && <p style={{color: 'red'}}>{errors?.title}</p>}
          </div>
          <br></br>
          <div>
            <label htmlFor="summary">summary: </label>
            <input
              type="text"
              name="summary"
              placeholder="summary...."
              value={input.summary}
              onChange={(e) => changeHandler(e)}
              className={style.input}
            /> 
            {errors.summary && <p style={{color: 'red'}}>{errors?.summary}</p>}
          </div>
          <br></br>
          <div>
            <label htmlFor="spoonacularScore">spoonacularScore: </label>
            <input
              type="text"
              name="spoonacularScore"
              placeholder="spoonacularScore...."
              value={input.spoonacularScore}
              onChange={(e) => changeHandler(e)}
              className={style.input}
            /> 
            {errors.spoonacularScore && <p style={{color: 'red'}}>{errors?.spoonacularScore}</p>}
          </div>
          <br></br>
          <div>
            <label htmlFor="healthScore">healthScore: </label>
            <input
              type="text"
              name="healthScore"
              placeholder="healthScore...."
              value={input.healthScore}
              onChange={(e) => changeHandler(e)}
              className={style.input}
            /> 
            {errors.healthScore && <p style={{color: 'red'}}>{errors?.healthScore}</p>}
          </div>
          <br></br>
          <div>
            <label htmlFor="analyzedInstructions">analyzedInstructions: </label>
            <input
              type="text"
              name="analyzedInstructions"
              placeholder="analyzedInstructions...."
              value={input.analyzedInstructions}
              onChange={(e) => changeHandler(e)}
              className={style.input}
            /> 
            {errors.analyzedInstructions && <p style={{color: 'red'}}>{errors?.analyzedInstructions}</p>}
          </div>
          <br></br>
          <div>
            <label htmlFor="image">image: </label>
            <input
              type="url"
              name="image"
              placeholder="Add url...."
              value={input.image}
              onChange={(e) => changeHandler(e)}
              className={style.input}
            /> 
             {errors.image&& <p style={{color: 'red'}}>{errors?.image}</p>}
          </div>
          <br></br>
          <div>
            <select
              onChange={(e) =>  handleSelect(e)}
              className={style.select}
            >
              {diets?.map((t) => {
                return <option value={t}>{t}</option>;
              })}
            </select>
            <button type="submit" className={style.correct}>
              Crear
            </button>
          </div>
        </form>
        <div>
          {input.diets.map((e) => {
            return (
              <div>
                <h5 className={style.types}>{e}</h5>
                <button className={style.btnx} onClick={() => handleDelete(e)}>
                  X
                </button>
              </div>
            );
          })}
        </div> 
        <Link to={'/homepage'}><button className={style.btn}>Homepage</button></Link>
      </div>
    </>
  );
};
export default CreateRecipes;
