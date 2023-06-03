const { Router } = require('express');   
const getRecipes = require('../controllers/getRecipes') 
const getRecipesId = require('../controllers/getRecipesId') 
const getRecipesName = require('../controllers/getRecipesName') 
const { Recipe, Diet} = require('../db');   


const router = Router();  

router.get('/recipe', async (req , res) => {
    try { 
        const allRecipes = await getRecipes() 
        res.json(allRecipes)
        
    } catch (error) { 
        res.status(500).json(error.message)       
    }
}) 
// Id 
router.get('/recipe/:id', async(req, res) => {
    const { id } = req.params 
    const source = isNaN(id) ? 'bdd' : 'api' 
    try { 
        const recipeid =  await getRecipesId(id, source ) 
        res.json(recipeid)
        
    } catch (error) {
        res.status(401).json(error.message)
    }
})  
router.get('/', async(req, res) => {
    const {title} = req.query  
    try { 
        const {resultNameApi,  resultNameDb } = await getRecipesName(title) 
       if(resultNameApi && resultNameDb ){
        res.json(resultNameApi.concat(resultNameDb))
       }else if(resultNameDb){
        res.json(resultNameDb)       
       }else if(resultNameApi){ 
        res.json(resultNameApi)
       }
      
    } catch (error) { 
        res.status(401).json(error.message)
      
    }
}) 
router.get('/delete/:id', async (req, res) =>{
    const {id} = req.params 
    try { 
        const dele = await Recipe.destroy({
            where: {id: `${id}`}
        }) 
        
    } catch (error) { 
        res.status(401).json(error.message)
        
    }  
    res.send('delete')

})  
router.put('/edit/:id', async(req,res) => {
    try {
        let {id} =req.params  
        console.log("id",req.params)
        let {title,summary,spoonacularScore,healthScore,analyzedInstructions,image,diets} = req.body  
        console.log("req.body ",req.body )
        await  Recipe.update({title,summary,spoonacularScore,healthScore,analyzedInstructions,image,diets},{
            where: {
                id,
            },
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
        res.status(200).send('actualizado')
    } catch (error) {
         res.status(400).send('no se pudo actualizar')
    }
})

module.exports = router