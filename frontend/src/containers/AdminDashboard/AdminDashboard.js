import React, { Component } from 'react';

import Cards from '../../containers/Viewer/Cards/Cards';
import UserList from './Users/Users';
import ServicesList from './Services/Services';
import NewUser from './NewUser/NewUser';
import NewService from './NewService/NewService';

class AdminDashboard extends Component{
    state = {   
        loggedInUser: {},
        update: false
    }

    componentDidMount(){
        this.setState({ loggedInUser: this.props.userInfo });
    }

    updateHandler = () => {
        this.setState({ update: !this.state.update });
    }

    render(){
        return(
            <>
            <div className="container mt-2">
                <div className="row">
                    <div className="col">
                        <div className="container">
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                    <a href="#userPanel" className="nav-link active" role="tab" data-toggle="tab" >User</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#servicePanel" className="nav-link" role="tab" data-toggle="tab">Services</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div role="tabpanel" className="tab-pane active" id="userPanel">
                                    <div className="row">
                                        <div className="col-sm mt-2">
                                            <UserList shouldUpdate={this.setState.update}/>
                                        </div>
                                        <div  className="col-sm mt-2">
                                            <NewUser updated={this.updateHandler} />                                            
                                        </div>
                                    </div>
                                </div>
                                <div role="tabpanel" className="tab-pane " id="servicePanel">
                                    <div className="row"> 
                                        <div className="col-sm mt-2">
                                            <ServicesList/>
                                        </div>
                                        <div  className="col-sm mt-2">
                                            <NewService updated={this.updateHandler} />                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    <div>
                        <Cards services={this.state.loggedInUser.services} role={this.state.loggedInUser.role} />
                    </div>
            </>
        );
    }
}

export default AdminDashboard;