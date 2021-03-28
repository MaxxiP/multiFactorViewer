import React from 'react';
import classes from './Logo.module.css';
import { FaKeycdn } from 'react-icons/fa';

const logo = (props) => (
    <div className={classes.Logo}>
        <FaKeycdn />
    </div>
);

export default logo;