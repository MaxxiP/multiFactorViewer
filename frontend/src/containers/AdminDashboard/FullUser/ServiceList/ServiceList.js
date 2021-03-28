import React, { Component } from 'react';
import axios_mongo from '../../../../axios-mongoose';

class ServiceList extends Component{
    state = {
        services: [],
        updatedServices: []
    }

    componentDidMount(){
        this.setState({ selectedUser: this.props.selectedUser });
        if (this.props.services) {
            this.getUsersService();
        }
    }

    getUsersService = () => {

        axios_mongo.get('/service/servicesAssigned' , { params: this.props.services })
        .then(res => {

            const fetchedServices = [];

            for (let key in res.data){
                fetchedServices.push({
                    ...res.data[key],
                    id: key
                })
            }
            
            this.setState({ services: fetchedServices, updatedServices: fetchedServices });

        }).catch(error => {
            console.error(error);
        });
    }

    render(){
        let list = <p>No services</p>;
        if(this.props.services){
            list  = (
            <table> 
                <thead>
                    <tr>
                        <th key='nameHead'>Servicename</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.updatedServices.map(service => (
                        <tr>
                            <td key={service.name}>{service.name}</td>
                            <td key={service.id} onClick={() => this.props.removeHandler(service.id)}>Remove</td>
                        </tr>
                    ))}
                </tbody>
            </table>);
        }

        return(
            <>
            {list}
            </>
        );
    }
}

export default ServiceList;