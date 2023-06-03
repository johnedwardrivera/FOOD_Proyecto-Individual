const axios = require('axios'); 
const { Recipe, Diet} = require('../db')   


// Traer todas las recetas 
 const getRecipes = async () =>{  
    const recipeApi = await getRecipeApi()   
    const recipeDb = await  getRecipeDb() 
    const allRecipes = [...recipeApi, ...recipeDb]
     console.log(allRecipes)
    return allRecipes

 } 


// Traer las recetas desde la api   
const getRecipeApi = async () => {
    // const apiUrl =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)  
    const apiUrl =  await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`) 
    console.log('api',apiUrl.data.results ) 
    return apiUrl.data.results.map(e =>{
        return{
            id: e.id, 
            title: e.title,
            image: e.image,
            diets: e.diets.map((d) => {return{name:d}}),
            spoonacularScore: e.spoonacularScore, 
            dishTypes: e.dishTypes.map((d) => {return{name:d}}), 
            summary: e.summary, 
            healthScore: e.healthScore, 
            analyzedInstructions: e.analyzedInstructions
        }
    })
} 

//traer la recetas desde la base de datos  
const getRecipeDb = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet, 
            attributes: ['name'], 
            through:{
                 attributes:[] 
            }
        }
    })
} 




module.exports = getRecipes
