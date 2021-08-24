import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
    // Notice that props.OnClick is use so the onClick event that i will add to the Button will be executed like a build in button -
    return <button className = {`${classes.button} ${props.className}`} type = {props.type || "button"} onClick = {props.onClick} >{props.children}</button>
}

export default Button;