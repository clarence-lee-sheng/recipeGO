import React, {useState} from "react"

import "./generateRecipePage.styles.scss"

import Ingredient from "../../components/ingredient/ingredient"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

const GenerateRecipePage = (props) => {
    const [ingInput, setIngInput] = useState('')
    
    return (
        <div className={`${props.isHidden ? "hidden":""} generate-recipe-page page`}>
            <div className="container">
                <div className="confirm-recipes">
                    <div className="confirm-recipes-container">
                        <div className="confirm-recipes-desc">Confirm your recipes</div> 
                        <div className="ingredients-container">
                            {props.ingArr.map((ing, idx)=> {
                                return (
                                    <Ingredient key={idx} idx={idx} name={ing.name} addIng={props.addIng} delIng={props.delIng}/>
                                )
                            })}
                        </div>
                        <input onChange={e=>{setIngInput(e.target.value)}} placeholder="new ingredient" className="ing-input" type="text"></input>
                        <div onClick={e=>{
                            if(ingInput){
                                props.addIng(ingInput)
                                setIngInput('')
                                document.querySelector(".ing-input").value = ''
                            }
                        }} className="plus-icon"> 
                            <FontAwesomeIcon icon={faPlus}/>                
                        </div>     
                        <div className="minus-icon" onClick={()=>props.setHideIngPage(true)}> 
                            <FontAwesomeIcon icon={faMinus}/>                
                        </div>  
                        <div className="recipify-btn">Recipify</div>
                    </div>  
                </div>   
            </div>
        </div> 
    )
}

export default GenerateRecipePage