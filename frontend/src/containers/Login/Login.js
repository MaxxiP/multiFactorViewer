import React, { Component } from 'react';

import LoginData from './LoginData/LoginData';

class Login extends Component{
    render(){
        return(
            <div>
                <LoginData authedHandler={this.props.authedHandler}/>
            </div>
        );
    }
}

export default Login;