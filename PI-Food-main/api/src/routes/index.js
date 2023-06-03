const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js'); 
const Route_Recipe = require('../server/Route_Recipe') 
const Route_types = require('../server/Route_types')  
const Route_PostRecipe = require('../server/Route_PostRecipe')



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter); 
router.use('/', Route_Recipe) 
router.use('/', Route_types) 
router.use('/', Route_PostRecipe)


module.exports = router;
