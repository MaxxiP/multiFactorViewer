import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Modal from 'react-modal';

Modal.setAppElement('#root')

// This side drawer stems from another project I learned React with and was thought to provide a side drawer menu on mobile devices
export const SideDrawer = (props) => {
    let attachedClasses = [
        classes.SideDrawer,
        classes.Close
    ];

    if(props.open){
        attachedClasses = [ classes.SideDrawer, classes.Open ];
    }

    return(
        <>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                
                <div className={classes.Logo}>
                    <Logo />
                </div>
            
                <nav>
                    <NavigationItems authed={props.authed} closed={props.closed} logOut={props.logOut} closeDrawer={props.closeDrawer}/>
                </nav>
            </div>

        </>
    );
};
