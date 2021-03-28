import React from 'react';
import classes from './Footer.module.css';
import {ChangePasswordModal} from '..//UI/Modal/Modal';

export const Footer = () => {
    return( 
        <>
            <footer className={classes.Footer}>
                <ChangePasswordModal />
            </footer>
        </>
    );
} 