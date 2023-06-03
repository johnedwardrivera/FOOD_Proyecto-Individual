import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { React, useEffect } from "react";  
import { useParams } from "react-router-dom"; 
import {updateRecipes} from '../../redux/actions/actions'  
import validations from './validations'
import style  from './EditRecipe.module.css'
const EditRecipe = () => { 
    const {id} = useParams() 
    const dispatch = useDispatch();   

    const[input, setInput] =useState({ 
        title: "",
        summary: "",
        spoonacularScore: "",
        healthScore: "",
        analyzedInstructions: "",
        image: "", 

    })    
    const [errors, setErrors] = useState({ 
        title: "",
        summary: "",
        spoonacularScore: "",
        healthScore: "",
        analyzedInstructions: "",
        image: "", 

    })
    // useEffect(() => {
    //     dispatch(updateRecipes(id));
    //   }, []);

   
    const handleChange = (e) => { 
        setInput({
            ...input, 
            [e.target.name]: e.target.value,
        })   
        setErrors(
            validations({
              ...input, 
              [e.target.name]: e.target.value,
            })
          ) 
}  


const handleSubmit = (e) =>{   
    e.preventDefault();
    dispatch(updateRecipes(input, id))     
    alert('uodate exitosa!')
    // console.log("nooo input)",input) 
    // console.log("nooo id",id)
    }
    return(
        <> 
        <div className={style.container} >
            <form className={style.formulario} onSubmit={(e) => handleSubmit(e)}>
                <div> 
                    <label htmlFor="title">Title: </label> 
                    <input 
                     type="text" 
                     name="title" 
                     placeholder="title...."  
                     value={input.title} 
                     onChange={(e) => handleChange(e)}
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
                    onChange={(e) => handleChange(e)}
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
                    onChange={(e) => handleChange(e)}
                    className={style.input}                    
                    /> 
                     {errors.spoonacularScore && <p style={{color: 'red'}}>{errors?.spoonacularScore}</p>}
                </div> 
                <br></br> 
                <div>
                <label  htmlFor="healthScore">healthScore: </label> 
                <input 
                 type="text" 
                 name="healthScore" 
                 placeholder="healthScore...."  
                 value={input.healthScore} 
                 onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
                className={style.input}
                />   
                  {errors.analyzedInstructions && <p style={{color: 'red'}}>{errors?.analyzedInstructions}</p>}
                </div> 
                <br></br> 
                <div>
                    <label htmlFor="image">image: </label> 
                    <input 
                    type="text"  
                    name="image" 
                    placeholder="Add url...."  
                    value={input.image} 
                    onChange={(e) => handleChange(e)}
                    className={style.input}                    
                    /> 
                     {errors.image&& <p style={{color: 'red'}}>{errors?.image}</p>}
                </div>   
                <br></br>  
                <div>
                <button type="submit" className={style.correct}>
              
                update
             </button> 
             </div>
            </form>  
            <Link to={'/homepage'}><button className={style.btn}>Homepage</button></Link>
        </div>
        </>
    )
} 
export default EditRecipe 