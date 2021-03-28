import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const NavigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink 
            exact 
            to={{ pathname: props.link}}
            className={props.active ? classes.active : null} >
            {props.children}
        </NavLink>
    </li>
);
 
export default NavigationItem;