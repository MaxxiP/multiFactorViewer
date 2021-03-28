import React, { Component } from 'react';
import axios_mongo from '../../../axios-mongoose';

import Spinner from '../../UI/Spinner/Spinner';

class FullUser extends Component{
    state={
        selectedUserServices: [],
        selectedUserServicesData: [],
        updatedServices: [],
        updatedServicesData: [],
        allServices: [],
        loading: false,
        error: '',
        message: ''
    }

    componentDidMount(){
        this.setState({ updatedServices: this.props.user.services}, () => {
            this.getUsersService(this.props.user.services);
        })
        this.getServices();
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.selectedUser !== prevProps.selectedUser){
            this.setState({ updatedServices: this.props.user.services}, () => {
                this.getUsersService(this.props.user.services);
            })
        }else if(this.state.updatedServices !== prevState.updatedServices){
            this.getUsersService(this.state.updatedServices);
        }
    }

    updateUserHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true });

        const updatedData = {
            id: this.props.user._id,
            name: this.updateUserName,
            mail: this.updateUserMail,
            password: this.updateUserPassword,
            role: this.updateUserRole,
            services: this.state.updatedServices
        };

        
        axios_mongo.patch('/user/user/' + updatedData.id, updatedData)
        .then(res => {
            this.setState({ loading: false, message: res.data.message });
            this.props.update();
        })
        .catch(err => {
            console.error(err)
            this.setState({ loading: false, error: err.response.data.error  });
        });
    }
  
    // Get all services for dropdown
    getServices = () => {
        axios_mongo.get('/service/services')
            .then(res => {
                const fetchedServices = [];

                for (let key in res.data){
                    fetchedServices.push({
                        ...res.data[key],
                        id: key
                    })
                }

                this.setState({ allServices: fetchedServices });
            })
            .catch(err => console.error(err));
    }

    getUsersService = (selectedUserServices) => {
        this.setState({ selectedUserServices: selectedUserServices});
        axios_mongo.get('/service/servicesAssigned' , { params: selectedUserServices })
        .then(res => {
            const fetchedServices = [];

            for (let key in res.data){
                fetchedServices.push({
                    ...res.data[key],
                    id: key
                })
            }

            this.setState({ selectedUserServicesData: fetchedServices, updatedServicesData: fetchedServices  });
        }).catch(error => {
            console.error(error);
        });
    }

    appendService = (e) => {
        const oldList = this.state.selectedUserServices;
        if(!oldList.includes(e)){
            const userServiceList = [...oldList, e];
        
            this.setState({ updatedServices: userServiceList});
        }
    }

    removeService = (id) => {
        const shortenedList = this.state.updatedServices.filter(service => service !== this.state.updatedServices[id]);
        this.setState({ updatedServices: shortenedList });
    }

    render(){
        let serviceDropdownList = <p>loading</p>;
        let selectedUserServicesList = <p>Loading</p>;

        if(this.state.selectedUserServicesData){
            selectedUserServicesList = (
                <div className="form-group mt-2">
                <table className="table table-striped"> 
                    <thead>
                        <tr>
                            <th key='nameHead'>Assigned Services</th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.selectedUserServicesData.map(service => (
                            <tr>
                                <td key={service.name}>{service.name}</td>
                                <td key={service.id} onClick={() => this.removeService(service.id)}>Remove</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            ); 
        }

        if(this.state.allServices){
            serviceDropdownList = (
                <div className="form-group">
                    <label htmlFor="updateUserServices" className="mr-2">Services:</label>
                    <select
                        className="form-control"
                        id='updateUserServices'
                        onChange={e => this.appendService(e.target.value)}
                    >
                        {this.state.allServices.map(service => (
                            <option key={service._id} value={service._id}>{service.name}</option>
                        ))}
                    </select>
                </div>
            );
        }
        let form = (
            <form onSubmit={this.updateUserHandler}>
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
                <div className="form-group" >
                    <label htmlFor='updateUserName'>Name:</label>
                    <input 
                        id='updateUserName' 
                        minLength='5'
                        maxLength='25' 
                        placeholder={this.props.user.name} 
                        type='text'
                        className="form-control" 
                        onChange={ e => this.updateUserName = e.target.value}/>
                </div>
                <div className="form-group">
                <label htmlFor='updateUserMail'>Email:</label>
                <input
                    id='updateUserMail' 
                    minLength='8'
                    maxLength='40'
                    placeholder={this.props.user.mail} 
                    type='email'
                    className="form-control" 
                    onChange={ e => this.updateUserMail = e.target.value}/>
                </div> 
                <div className="form-group">
                <label htmlFor='updateUserPassword'>Password:</label>
                <input 
                    id='updateUserPassword'
                    minLength='8'
                    maxLength='40'
                    placeholder={this.props.user.password} 
                    type='password'
                    className="form-control" 
                    onChange={ e => this.updateUserPassword = e.target.value}/>
                </div>

                <div className="form-inline d-flex justify-content-between align-items-center">
                    <div className="form-group">
                        <label htmlFor='updateUserRole' className="mr-2">Role:</label>
                        <select 
                            id='updateUserRole'
                            className="form-control mr-2"
                            onChange={ e => this.updateUserRole = e.target.value}
                            >
                            <option hidden defaultValue>Choose Role</option>
                            <option value='user' >User</option>
                            <option value='admin' >Admin</option>
                        </select>
                    </div>

                    {serviceDropdownList}
                    {selectedUserServicesList}
                    
                    <div className="form-group mt-2">

                        <button className="btn btn-primary">Update User</button>
                    </div>
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
                <h1>Edit User</h1>
                {form}
            </div>
        );
    }

}

export default FullUser;