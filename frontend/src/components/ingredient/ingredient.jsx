import React from "react"

import "./ingredient.styles.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Ingredient = (props) => {
    return(
        <div className="ing">
            <div className="ing-label">{props.name}</div>
            <div className="cancel-icon" onClick={()=>props.delIng(props.idx)}>
                <FontAwesomeIcon icon={faTimes}/>
            </div> 
        </div>
    )
}

export default Ingredient