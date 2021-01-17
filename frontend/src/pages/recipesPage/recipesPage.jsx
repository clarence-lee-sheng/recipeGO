import React from "react"

import './recipesPage.styles.scss'

import { 
    Link
  } from "react-router-dom"
  

const RecipesPage = (props) => {
    console.log(props.recipes)
    return(
        <div className="recipe-page page">
            <div className="recipe-container"> 
                <div className="recipe-images-container">
                    {props.recipes.map(el => {
                        console.log(props.recipes)
                        return(
                            <div className="recipe">  
                                <div className="recipe-title">{el.title}</div>
                                <img className="recipe-image" src={el.image}></img>
                            </div>
                        )
                    })}
                </div>
                <button onClick={props.toggleToCamera} className="retake-img-btn">Take another picture</button> 
            </div>          
        </div>
    )
}

export default RecipesPage
