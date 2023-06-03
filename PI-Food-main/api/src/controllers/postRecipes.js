const { Recipe, Diet} = require('../db')   

const postRecipes = async (objrecipe) => {
    try { 
        const { title, summary, spoonacularScore, healthScore, analyzedInstructions,image, diets} = objrecipe 
        if(!title || !summary || !spoonacularScore || !healthScore || !analyzedInstructions || !image || !diets) throw new Error('Mandatory data missing')  
        const newRecipe = {title, summary, spoonacularScore, healthScore, analyzedInstructions, image} 
        const createRecipe = await Recipe.create(newRecipe) 

        let dietData = await Diet.findAll({
            where: { name:diets}
        }) 

        if(dietData == ''){ 
            dietData = await Diet.create({
                name:diets
            })

        } 
        createRecipe.addDiet(dietData) 

        return Recipe.findAll({
            include: [ 
                {
                    model: Diet,
                    attributes:['id', 'name']
                }
               
            ]
        })
        
    } catch (error) { 
        return { error: error.message }
        
    }
} 
module.exports = postRecipes