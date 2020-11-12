import React from 'react';
import './Builder.css'

const Builder = (props) => {
    return (
        <div className="builder">
            <p>{props.title}</p>
            <button onClick={props.add}>Add</button>
            <button onClick={props.remove}>Remove</button>
        </div>
    )
}

export default Builder;