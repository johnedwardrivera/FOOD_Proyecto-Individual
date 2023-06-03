import React from 'react'
import img5 from '../../img/cosina.gif' 
import style from './Loading.module.css'
const Loading = () => {
    return(
        <div className={style.container}>    
            <img className={style.load} src={img5}
             alt=""       
             />       
        </div>
    )
}
export default Loading