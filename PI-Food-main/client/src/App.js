import './App.css'; 
import LandingPage from './components/LandingPage/LandingPage'  
import HomePage from './components/Home/HomePage' 
import Details from './components/DetailPage/Details' 
import CreateRecipes from './components/CreateRecipes/CreateRecipes' 
import EditRecipe from './components/EditRecipe/EditRecipe'

import { Routes, Route, } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route> 
        <Route path='/homepage' element={<HomePage/>}></Route> 
        <Route path='/details/:id' element={<Details/>}></Route> 
        <Route path='/create' element={<CreateRecipes/>}></Route> 
        <Route path='/edit/:id' element={<EditRecipe/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
