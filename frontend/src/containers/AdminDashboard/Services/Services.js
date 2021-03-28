import React, { Component } from 'react';
import axios_mongo from '../../../axios-mongoose';
import { FaTrash, FaPen } from 'react-icons/fa';

import FullService from '../FullService/FullService';

class Services extends Component{
    state = { 
        services: [],
        service: {},
        selectedService: '',
        updated: false
    }

    componentDidMount(){
        this.getServices();
    }

    componentDidUpdate(){
        if(this.state.updated){
            this.getServices();
            this.setState({ updated: false });
        }
    }

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

                this.setState({ loading: false, services: fetchedServices})
            })
            .catch(err => console.error(err));
    }

    serviceClickHandler = (id) => {
        axios_mongo.get('/service/service/' + id)
        .then(res => {
            this.setState({ 
                service: res.data,
                selectedService: id
            });
        })
        .catch(err => console.error(err));
    }

    unselectClickhandler = () => {
        this.setState({ selectedService: '' });
    }

    serviceDeleteHandler = (id) => {
        axios_mongo.delete('/service/service/' + id)
            .then(res => {
                this.setState({ updated: true });
            })
            .catch(err => console.error(err));
    }

    serviceUpdateHandler = () => {
            this.setState({ updated: true, selectedService: '' });
    }

    render(){
        if(!this.state.error){
            return(
                <div className="card mb-5">
                    <div className="card-header">
                        <h3>Servicelist</h3>
                    </div>
                    <div className="card-body">
                        <table  className="table table-striped"> 
                            <thead>
                            <tr>
                                <th key='nameHead'>Servicename</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                                <tbody>
                            {this.state.services.map(service => (
                                <tr key={service.username}>
                                    <td className="col-sm-2"  key={service.name}>{service.name}</td>
                                    <td key={service.mail} ><FaPen onClick={() => this.serviceClickHandler(service._id)}/></td>
                                    <td key={service.id} ><FaTrash onClick={() => {if(window.confirm('Delete the item?'))this.serviceDeleteHandler(service._id)}}/></td>
                                </tr>
                            ))} 
                            </tbody>
                        </table>
                    </div>                        
                    
                        {this.state.selectedService ? <div className="card-footer"><FullService selectedUser={this.state.selectedService} service={this.state.service} update={this.serviceUpdateHandler} unselect={this.unselectClickhandler}/></div> : null }
                    
                </div>
            );
        }else{
            return(<p>An error occured</p>);
        }
    }
}

export default Services;