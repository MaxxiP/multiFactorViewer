import React, { Component } from 'react';
import Spinner from '../../UI/Spinner/Spinner';
import axios_mongo from '../../../axios-mongoose';

class NewUser extends Component{
    state = {
        loading: false,
        error: '',
        message: ''
    };

    newServiceHandler = (event) => {
        event.preventDefault();
        
        this.setState({ loading: true, error: false});

       const newServiceData = {
            name: this.serviceName, 
            username: this.serviceUsername,
            mail: this.serviceMail,
            secret: this.serviceSecret
        }

        axios_mongo.post('/service/service/', newServiceData)
            .then(res => {
                this.setState({ loading: false, message: res.data.message });
                this.props.updated();
            })
            .catch(err => {
                console.error(err);
                this.setState({ loading: false, error: err.response.data.error})
            })
    } 

    render(){

        let form = (
            <div className="card">
            <div className="card-header">
            <h3>Add a new Service</h3>
            </div>
            <div className="card-body">
            <form onSubmit={this.newServiceHandler}>
                <div className="form-group">
                <label htmlFor='name'>Name:</label>
                    <input 
                        id='serviceName' 
                        placeholder='Insert name'
                        required
                        minLength='2'
                        maxLength='25' 
                        type='text'
                        className="form-control" 
                        onChange={ e => this.serviceName = e.target.value}/>
                </div>
                <div className="form-group">
                <label htmlFor='name'>Username:</label>   
                    <input 
                        id='serviceUsername' 
                        placeholder='Insert username'
                        required
                        minLength='2'
                        maxLength='25' 
                        type='text'
                        className="form-control" 
                        onChange={ e => this.serviceUsername = e.target.value}/>
                </div>
                <div className="form-group">  
                <label htmlFor='name'>Email:</label>                   
                    <input 
                        id='serviceMail' 
                        placeholder='Insert mail'
                        required
                        minLength='8'
                        maxLength='40' 
                        type='email'
                        className="form-control" 
                        onChange={ e => this.serviceMail = e.target.value}/>
                </div>
                <div className="form-group">  
                <label htmlFor='name'>Secret:</label>                   
                    <input 
                        id='serviceSecret' 
                        placeholder='Insert secret'
                        required
                        minLength='5'
                        maxLength='100' 
                        type='text'
                        className="form-control" 
                        onChange={ e => this.serviceSecret = e.target.value}/>
                </div>
                {this.state.error ? 
                    <div className="alert alert-warning" role="alert">
                        {this.state.error}
                    </div> 
                : null }
                {this.state.message ? 
                    <div className="alert alert-success" role="alert">
                        {this.state.message}
                    </div> 
                : null }
                <button className="btn btn-primary">Add New Service</button>
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

