import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return(
        <>
            <h1>404 Not Found</h1>
            <Link to="/">Login</Link>
        </>
    );
} 

export default NotFound;