const axios = require('axios');
const { Recipe, Diet} = require('../db')    


const getRecipesName = async (title) => {
    const resultNameApi = await getNameApi(title) 
    const resultNameDb = await getNameDb(title) 
    return{
        resultNameApi,  
        resultNameDb 

    }
}

const getNameApi = async (title) => {
    try { 
        const nameApi = await axios(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`) 
        const data = await nameApi.data.results  
        const recipeNameData = data.find(e => e.title.toUpperCase() == title.toUpperCase()) 
        if(recipeNameData){ 
            return[{
            id: recipeNameData.id, 
            title: recipeNameData.title,
            image: recipeNameData.image,
            diets: recipeNameData.diets.map((d) => {return{name:d}}),
            spoonacularScore: recipeNameData.spoonacularScore, 
            dishTypes: recipeNameData.dishTypes.map((d) => {return{name:d}}), 
            summary: recipeNameData.summary, 
            healthScore: recipeNameData.healthScore, 
            analyzedInstructions: recipeNameData.analyzedInstructions
            }]
        }
        
    } catch (error) { 
        return error.message
        
    }
} 

const getNameDb = async (title) => {
    try { 
        const nameDb = await Recipe.findAll({
            include: {
                model: Diet, 
                attributes: ['name'], 
                through:{
                     attributes:[] 
                }
            }
        }) 
    
const recipeNameDb = nameDb.find(e => e.title.toUpperCase() == title.toUpperCase()) 
 if(recipeNameDb){
    return[{ 
        id: recipeNameDb.id,  
        title: recipeNameDb.title, 
        summary: recipeNameDb.summary,  
        spoonacularScore: recipeNameDb.spoonacularScore,  
        healthScore: recipeNameDb.healthScore,  
        analyzedInstructions: recipeNameDb.analyzedInstructions, 
        image: recipeNameDb.image,
        diets:recipeNameDb.diets.map(t => t.name)

    }]
 }
        
    } catch (error) { 
        return error
        
    }
} 
module.exports = getRecipesName