import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Spinner from '../../UI/Spinner/Spinner';
import axios_mongo from '../../../axios-mongoose';

class LoginData extends Component{
    state = {
        loading: false,
        authed: false,
        error: ''
    }
    
loginHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const loginData = {
        mail: this.mail,
        password: this.password
    } 

    axios_mongo.post('/auth/login', loginData)
    .then(res => {
        axios_mongo.get('/user/user/' + res.data.id)
            .then(res => {
                this.setState({ loading: false, authed: true}, () => {
                    this.props.authedHandler({ authed: this.state.authed , userInfo: res.data });
                });
            })
            .catch(err => {
                console.error(err);
                this.setState({ loading: false, error: err.response.data.message });
            });
    })
    .catch(err => {
        this.setState({ loading: false, error: err.response.data.message });
    });
}
  
    render(){
        if(this.state.authed){
            return <Redirect to='/dashboard' />;
        }else{
            let form = (
                <form  onSubmit={this.loginHandler}>
                    <div className="mb-3">
                        <label htmlFor="mail" className="form-label">Email</label>
                        <input  className='form-control'                           
                                id='mail' 
                                placeholder='Insert Mail'
                                required 
                                minLength='8'
                                maxLength='40'
                                type='email'
                                onChange={ e => this.mail = e.target.value} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input  className='form-control'                           
                                id='password' 
                                placeholder='Insert Password'
                                required 
                                minLength='8'
                                maxLength='40'
                                type='password'
                                onChange={ e => this.password = e.target.value} />
                    </div>
                    {this.state.error ? 
                        <div className="alert alert-warning" role="alert">
                        {this.state.error}
                        </div>
                        : null} 
                    <button className="btn btn-primary">Login</button>    
                </form>
            );

            if(this.state.loading){
                form = <Spinner />
            }
            
            return(
                <div className="d-flex justify-content-center">
                    <div className="card mt-2 col-10 col-sm-6 col-md-6 col-lg-3">
                        <div className="card-body">
                            {form}
                        </div>
                    </div>
                </div>
            );
        }

    }
}

export default LoginData;