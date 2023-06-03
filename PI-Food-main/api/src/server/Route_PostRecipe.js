const { Router } = require('express');  
const postRecipes = require('../controllers/postRecipes') 

const router = Router();  

router.post('/recipes', async (req , res) => {
    const objrecipe = req.body  
    console.log("objrecipe",objrecipe)
    try { 
        const createRecipe = await postRecipes(objrecipe) 
        res.status(201).json(createRecipe)
        
    } catch (error) { 
        res.status(500).json(error.message)        
    }
}) 
module.exports = router