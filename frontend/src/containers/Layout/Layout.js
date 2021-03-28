import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import {SideDrawer} from '../Navigation/SideDrawer/SideDrawer'
import {Footer} from '../Footer/Footer';

// Source Maximilian Schwarzmüller
// https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8125740#overview
class Layout extends Component{
    state = {
        showDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showDrawer: false });
    };

    sideDrawerOpen = () => { 
        this.setState((prevState) => {
            return { showDrawer: !prevState.showDrawer };
        })
    };

    render(){
        return(
            <div className={classes.Outer}>
                <Toolbar 
                        authed={this.props.authed}
                        open={this.sideDrawerOpen} 
                        logOut={this.props.logOut}
                        userInfo={this.props.userInfo}
                    />
                <SideDrawer open={this.state.showDrawer} closed={this.sideDrawerClosedHandler} authed={this.props.authed} logOut={this.props.logOut} />
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
                    {this.props.authed ? <Footer/> : null }
            </div>
        );
    }
}

export default Layout;