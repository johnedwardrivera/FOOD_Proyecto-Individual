const axios = require('axios') 
const { Recipe, Diet} = require('../db')  
const { API_KEY } = process.env    


const getRecipesId = async (id, source) => {
    const recipe = source == 'api' ? RecipeIdApi(id) : await RecipeIdDb(id) 
    return recipe
}


//Buscar la id desde la api 
const RecipeIdApi = async (id) => {
    try { 
        // const RecipesIdApi = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        const RecipesIdApi = await axios(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)   
        const data = await RecipesIdApi.data.results 
        const recipeApi = data.filter(e => e.id == id)  
        if(recipeApi){
            return recipeApi
        }
        
    } catch (error) { 
        return error;
        
    }
} 
// Buscar la id en la db 
const RecipeIdDb = async (id) => {
    try { 
       const recipeDb = await Recipe.findOne({ 
        where: { id: id },
        include: [ 
        {
              model: Diet, 
              attributes: ['name'], 
              through:{
                attributes:[] 
             }
        }
        ]
       }) 
       if(recipeDb){
        return [{
            id: recipeDb.id,  
            title: recipeDb.title, 
            summary:recipeDb.summary,  
            spoonacularScore: recipeDb.spoonacularScore,  
            healthScore:recipeDb.healthScore,  
            analyzedInstructions: recipeDb.analyzedInstructions, 
            image: recipeDb.image,  
            diets:recipeDb.diets.map(t => t.name)

        }]
       }
        
    } catch (error) { 
        return error;       
    }
} 
module.exports = getRecipesId 