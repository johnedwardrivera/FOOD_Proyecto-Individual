import style from './Paginado.module.css'
const Paginado = ({recipesPerPage ,  allRecipes , paginado}) => {
    const pageNumbers = [] 
    for(let i = 0; i< Math.ceil(allRecipes/recipesPerPage);i++){
        pageNumbers.push(i+1)
    } 
    return(
        <nav>
            <ul className={style.ul}>
                {
                   pageNumbers && pageNumbers.map(n => (
                    <li key={n}  >
                    <button className={style.container} onClick= {() => paginado(n)} >{n}</button>
                    </li>
                ))
                }
            </ul>
        </nav>
    )
} 
export default Paginado