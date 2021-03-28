import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItems.module.css';

class NavigationItems extends Component{
    render(){
        let items; 
        if(this.props.authed){
            items= ( 
                <ul className={classes.NavigationItems}>
                    <li className={classes.NavigationItem}>
                        <NavLink exact to="/dashboard" activeClassName={classes.active} onClick={this.props.closed} >
                            Dashboard
                        </NavLink>
                    </li>
                    <li className={classes.NavigationItem} onClick={this.props.closed}>
                        <NavLink to="/" onClick={() => this.props.logOut()} >
                            Logout
                        </NavLink>
                    </li>
                </ul>
            );
        }else{
            items= null;
        }

        return(
            items
        );
    }
}

export default NavigationItems;