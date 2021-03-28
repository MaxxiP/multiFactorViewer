import React, { Component } from 'react';
import axios_mongo from '../../../axios-mongoose';

import Spinner from '../../UI/Spinner/Spinner';
 
class FullService extends Component{
    state={
        service: {},
        updateServiceForm: {},
        loading: false,
        error: ''
    }

    updateServiceHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true });

        const updatedData = {
            id: this.props.service._id,
            name: this.name,
            username: this.username,
            mail: this.mail,
            secret: this.secret
        }; 


        axios_mongo.patch('/service/service/' + updatedData.id, updatedData)
            .then(res => {
                this.setState({ loading: false, message: "Successfully updated user information." });
                this.props.update();
            }).catch(err => {
                console.error(err);
                this.setState({ loading: false, error: err.response.data.error });
            })
    }

    render(){
        let form = (
            <form onSubmit={this.updateServiceHandler}>
                {this.state.error ? 
                <div className="alert alert-warning" role="alert">
                    {this.state.error}
                </div>
                : null }                
                <div className="form-group">
                    <label htmlFor='name' className='form-label'>Name:</label>
                    <input 
                        id='name' 
                        placeholder={this.props.service.name}
                        minLength='2'
                        maxLength='25'                        
                        type='text' 
                        className='form-control'
                        onChange={ e => this.name = e.target.value}
                        />
                </div>
                <div className="form-group">
                <label htmlFor='username'>Username:</label>
                <input 
                    id='username' 
                    placeholder={this.props.service.username} 
                    minLength='2'
                    maxLength='25'                    
                    type='text' 
                    className='form-control'
                    onChange={ e => this.username = e.target.value}/>
                </div>
                <div className="form-group">
                <label htmlFor='email'>Email:</label>                
                <input 
                    id='mail'
                    placeholder={this.props.service.mail} 
                    type='email'
                    minLength='8'
                    maxLength='40'                     
                    className='form-control'
                    onChange={ e => this.mail = e.target.value}/>
                </div>
                <div className="form-group">
                <label htmlFor='secret'>Secret</label>
                <input 
                    id='secret'
                    placeholder={this.props.service.secret} 
                    type='text'
                    minLength='5'
                    maxLength='100'                     
                    className='form-control'
                    onChange={ e => this.secret = e.target.value}/>
                </div>
                <div className="form-group mt-2">
                    <button className="btn btn-primary">Update Service</button>
                </div>
            </form>
        );

        if(this.state.loading){
            form = <Spinner />
        }

        return(
            <div>                   
                <button onClick={this.props.unselect} type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h1>Edit Service</h1>

                {form}
            </div>
        );
    }

}

export default FullService;