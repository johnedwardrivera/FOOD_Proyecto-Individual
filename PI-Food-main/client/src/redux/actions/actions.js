import axios from 'axios';
import {GET_RECIPES, GET_DETAIL_RECIPES, GET_BY_NAME, GET_TYPES_DIETS, POST_RECIPES, FILTER_BY_TYPEDIET, ORDENAR, ORDENAR_HEALTHSCORE,DELETE_RECIPES,LOADING,UPDATE_RECIPES } from '../action-types/action-types' 

export const getRecipes = () =>{
    return async (dispatch) => { 
        dispatch({type:LOADING})
        const response = await axios(`http://localhost:3001/recipe`) 
        return dispatch({
            type:GET_RECIPES, 
            payload:response.data
        })
    }
} 
export const getDetailRecipes = (id) => {
    return async (dispatch) => {
        const response = await axios(`http://localhost:3001/recipe/${id}`) 
        return dispatch({
            type:GET_DETAIL_RECIPES, 
            payload:response.data
        })
    }
} 
export const getRecipesByName = (title) => {
    return async (dispatch) => {
        const response = await axios(`http://localhost:3001/`,{ params: { title} }) 
        return dispatch({
            type:GET_BY_NAME, 
            payload: response.data
        })
    }
} 
export const getTypesDiets = () =>{
    return async (dispatch) => {
        const response = await axios(`http://localhost:3001/diet`) 
        return dispatch({
            type:GET_TYPES_DIETS,
            payload:response.data
        })
    }
} 
export const postRecipes = (objrecipe) => {  
    console.log('objrecipe',objrecipe)
    return async (dispatch) => {
        const response = await axios.post(`http://localhost:3001/recipes`, objrecipe) 
        if(response.data){
            response.data = 'created successfully'
        } 
        return dispatch({
            type:POST_RECIPES, 
            payload:response.data
        })
    } 
} 
export const filterRecipesByTypeDiet = (payload) =>{
    return{
        type:FILTER_BY_TYPEDIET,
        payload
    }
} 
export const orderRecipes = (payload) =>{
    return{
        type:ORDENAR,
        payload
    }
} 
export  const ordenHealthScore = (payload) => {
    return{
        type:ORDENAR_HEALTHSCORE, 
        payload
    }
} 
export const deleteRecipes = (id) => {
    return async (dispatch) => {
       const response = await axios(`http://localhost:3001/delete/${id}`)  
       const total = await axios(`http://localhost:3001/recipe`) 
       return dispatch({
        type:DELETE_RECIPES,  
        payload: total.data, 
       })
    }
} 
export const updateRecipes = ( input , id) => { 
    console.log("input",input) 
    console.log("id",id)
    return async (dispatch) => { 
        const response = await axios.put(`http://localhost:3001/edit/${id}`, input) 
        const total = await axios(`http://localhost:3001/recipe`)  
        return dispatch({
            type:UPDATE_RECIPES,
            payload:total.data
        })
    }
}