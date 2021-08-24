import React from 'react';

import classes from './Card.module.css';

const Card = (props) => {
    // Notice that props.className allow me to use the concept of className in my own components like the default ones along with the classes.card that i
    // use inside this Card component. 
    return <div className = {`${classes.card} ${props.className}`}>{props.children}</div>
}

export default Card;