import React from 'react';

const Card = (props) => {

    return(
        <div className="container d-flex justify-content-center">
            <div className="card text-center mt-2 col-10 col-sm-6 col-md4 col-lg-5">
                <div className="card-body">
                    <p>{props.name}</p>
                    <p>{props.mail}</p>
                    <p>{props.code}</p>
                </div>
            </div>
        </div>

    );
};

export default Card;