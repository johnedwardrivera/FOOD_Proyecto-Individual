import {GET_RECIPES, GET_DETAIL_RECIPES, GET_BY_NAME,GET_TYPES_DIETS,POST_RECIPES,FILTER_BY_TYPEDIET,ORDENAR,ORDENAR_HEALTHSCORE,DELETE_RECIPES,LOADING,UPDATE_RECIPES  } from '../action-types/action-types' 

const initialState = {
    getRecipes:[], 
    getAllRecipes:[], 
    detailRecipe:[], 
    TypesDiets:[], 
    postRecipesCreate:"", 
    loading: false
}
const reducer = (state = initialState, action) => {
    switch (action.type){
        case GET_RECIPES: 
        return {
            ...state,  
            loading: false,
            getRecipes: action.payload, 
            getAllRecipes:action.payload
        }  
        case GET_DETAIL_RECIPES: 
        return{
            ...state,  
            detailRecipe:action.payload

        } 
        case GET_BY_NAME: 
        return{
            ...state, 
            getRecipes:action.payload

        } 
        case GET_TYPES_DIETS:
            return{
                ...state,
                TypesDiets:action.payload

            } 
        case POST_RECIPES: 
            return{
                ...state,
                postRecipesCreate:action.payload

            } 
        case FILTER_BY_TYPEDIET: 
        const allRec = state.getAllRecipes  
        const typeDietFilter = action.payload == 'All' ? allRec : allRec.filter(t =>t.diets.find(e => e.name == action.payload))
        console.log('typeDietFilter',typeDietFilter)
        return{
            ...state,
            getRecipes : typeDietFilter
        } 
        case ORDENAR:  
        let orderAsc = state.getRecipes.slice().sort((a,b) =>{
            let recipesA = a.title.toLowerCase() 
            let recipesB = b.title.toLowerCase() 
            if(recipesA > recipesB) return 1 
            if(recipesB > recipesA) return -1 
            return 0
        }) 
        const allrecipes = state.getAllRecipes 
        const orderName = action.payload == 'asc' ? orderAsc : orderAsc.reverse() 
        return{
            ...state, 
            getRecipes: action.payload == '' ? allrecipes:orderName 

        } 
        case ORDENAR_HEALTHSCORE:  
        let ordenHealthScoreASC = state.getRecipes.slice().sort((a,b) =>{ 
            if(Number(a.healthScore) > Number(b.healthScore)) return 1 
            if(Number(b.healthScore) > Number(a.healthScore)) return -1 
            return 0

        }) 
        return{
            ...state, 
            getRecipes: action.payload == 'asc' ? ordenHealthScoreASC : ordenHealthScoreASC.reverse()

        } 
        case DELETE_RECIPES: 
        return{
            ...state,   
            getRecipes:action.payload
        } 
        case LOADING: 
        return{
            ...state,
            loading: true
        } 
        case UPDATE_RECIPES:
            return{
                ...state,
                getRecipes:action.payload
            }

 
        default: 
        return {...state}
    }
} 
export default reducer