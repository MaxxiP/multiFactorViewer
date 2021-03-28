import React, { Component } from 'react';
import Spinner from '../../UI/Spinner/Spinner';
import axios_mongo from '../../../axios-mongoose';

class NewUser extends Component{
    state = {
        loading: false,
        roleError: false,
        error: '',
        message: ''
    };

    newUserHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true, error: '', roleError: false });

        if (this.role) {
            this.setState({ roleError: false });

            const newUserData = { 
                name: this.name,
                mail: this.mail,
                password: this.password,
                role: this.role
            }
    
            axios_mongo.post('/user/user/', newUserData)
                .then(res => {
                    this.setState({ loading: false, message: res.data.message });
                    this.props.updated();
                })
                .catch(err => {
                    this.setState({ loading: false, error: err.response.data.error });
                });
        } else {
            this.setState({ roleError: true, loading: false });
        }
    }

    render(){
        let form = (
            <div className="card">
            <div className="card-header">
            <h3>Add a new User</h3>
            </div>
            <div className="card-body">
            <form  onSubmit={this.newUserHandler}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id='name'                   
                        placeholder='Insert name'
                        required
                        minLength='2'
                        maxLength='25' 
                        onChange={ e => this.name = e.target.value}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mail" className="form-label">Mail:</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id='mail'                    
                        placeholder='Insert Mail'
                        required
                        minLength='8'
                        maxLength='40' 
                        onChange={ e => this.mail = e.target.value}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id='password'                     
                        placeholder='Insert Password'
                        required
                        minLength='8'
                        maxLength='40' 
                        onChange={ e => this.password = e.target.value}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role" className="form-label">User Role:</label>
                    <select 
                        onChange={ e => this.role = e.target.value}
                        required
                        name='role'
                        className="form-control"
                        aria-label="Select User Role"
                    >
                        <option hidden defaultValue>Choose Role</option>
                        <option value='user' >User</option>
                        <option value='admin' >Admin</option>
                    </select>
                </div>
                {this.state.roleError ? 
                    <div className="alert alert-warning" role="alert">Please select a role</div>
                 : null}
                {this.state.error ? <div className="alert alert-warning" role="alert">{this.state.error}</div> : null}
                {this.state.message ? <div className="alert alert-success" role="alert">{this.state.message}</div> : null}

                <button className="btn btn-primary">New User</button>    
            </form>
            </div>
            </div>
        );


        if(this.state.loading){
            form = <Spinner />
        }
        
        return(
            <div>
                {form}
            </div>
        );
    }
    
}

export default NewUser; 