const { Router } = require('express');   
const { Recipe, Diet} = require('../db')  
const { diets} = require('../controllers/diets')

const router = Router();   

router.get('/diet', async (req , res) => { 
  try { 
    diets.forEach(e =>{
        Diet.findOrCreate({
            where: {name: e.name}
        })
    }) 
    const dietTypes = await Diet.findAll() 
    res.json(dietTypes.map(e => e.name))
     
  } catch (error) { 
    res.status(500).json(error.message)   
    
  }

}) 
module.exports = router