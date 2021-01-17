import React from "react"

import "./ingredient.styles.scss"

const Ingredient = (props) => {
    return(
        <div className="ingredient">
            <div className="ing-label">{props.ingredient}</div>
        </div>
    )
}

export default Ingredient