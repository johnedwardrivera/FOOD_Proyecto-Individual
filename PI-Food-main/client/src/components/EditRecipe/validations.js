const validations = (input) =>{
    const errors = {}
    const reg = new RegExp('^[0-9]+$');
    if (!input.title) {
     if (typeof input.title === 'string') {
         errors.title = 'The entered value is not valid'
     }    errors.title = 'This field is required'
 }
 if(!input.summary){
     if(typeof input.summary === 'string'){
         errors.summary = 'enter the type of recipe'
     }errors.summary  = 'This field is required'
 
 
 }
 if(input.spoonacularScore < 0 || input.spoonacularScore > 100 || !reg.test(input.spoonacularScore)){
     errors.spoonacularScore = 'enter score between 0-100'
 } 
 if(input.healthScore < 0 || input.healthScore > 100 || !reg.test(input.healthScore)){
     errors.healthScore = 'enter healthScore between 0-100'
 } 
 if(!input.analyzedInstructions){
     if(typeof input.analyzedInstructions === 'string'){
         errors.analyzedInstructions= 'enter instructions'
     }errors.analyzedInstructions = 'This field is required'
 } 
 if(!input.image.includes("https://" || "http://") || !input.image.includes(".jpg" || ".png" || ".gif")){
     errors.image = 'Enter a valid URL (.jpg, .png, .gif)'
 }
 return errors
}
export default validations