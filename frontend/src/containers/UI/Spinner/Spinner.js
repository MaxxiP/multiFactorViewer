import React from 'react';
import classes from './Spinner.module.css';

// this component renders a css spinner as loading indicator, the spinner css design was taken from
// https://projects.lukehaas.me/css-loaders/
const spinner = () => (
    <div className={classes.Loader}>Loading...</div>
);

export default spinner;