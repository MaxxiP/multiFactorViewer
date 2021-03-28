import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../Logo/Logo';

const toolbar = (props) => (
    <header  className={classes.Toolbar}>
        {props.authed ? <DrawerToggle toggle={props.open} /> : null}
        <div className={classes.Logo}>
            <Logo />
            {props.userInfo.mail ? 
            <div className={classes.UserMail}>
                <p>Logged in as: {props.userInfo.mail}</p>
            </div> : null }
        </div>
        <nav className={classes.DesktopOnly}> 
            <NavigationItems authed={props.authed} logOut={props.logOut} />
        </nav>
    </header>
); 

export default toolbar; 