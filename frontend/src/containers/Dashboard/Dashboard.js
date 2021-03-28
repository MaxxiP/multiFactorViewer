import React, { Component } from 'react';

import classes from './Dashboard.module.css';
import Viewer from '../Viewer/Viewer';
import AdminDashboard from '../AdminDashboard/AdminDashboard';

class Dashboard extends Component{
    render(){
        let view;

        if(this.props.role === 'admin'){
            view = <AdminDashboard userInfo={this.props.userInfo}/>;
        }else if(this.props.role === 'user'){
            view = <Viewer role={this.props.role} userInfo={this.props.userInfo} />;
        }else{
            view = <p>ERROR</p>;
        }
        return(
            <div className={classes.container}>
                    {view}
            </div>
        );
    }
}

export default Dashboard;