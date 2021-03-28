import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import axios_mongo from './axios-mongoose';

import Layout from './containers/Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';

import Login from './containers/Login/Login';


class App extends Component {
  state = {
    auth: false,
    role: '',
    loggedInUser: ''
  } 

  componentDidMount(){
    this.checkAuthed();
  }

  checkAuthed = () => {
    axios_mongo.get("/auth/isLoggedIn", { withCredentials: true })
    .then(res => {
      if(res.data.userData){
        this.setState({
          auth: true,
          role: res.data.userData.role,
          loggedInUser: res.data.userData
        })
      }else{
        this.setState({ 
          auth: false,
          role: '',
          loggedInUser: ''
        });
      }
    })
    .catch(error => console.log(error));
  }

// The authHandler is send as property to the login component to set the authed state and role aswell
// as the logged in user information when successfully logged in
  authedHandler = (user) => {
    this.setState({ 
      auth: user.authed,
      role: user.userInfo.role,
      loggedInUser: user.userInfo
    });

    setTimeout(() => {
      
      if(this.state.auth){
        axios_mongo.post('/auth/logout').then(res => {
          this.setState({ auth: false, role: '', loggedInUser: ''});
        }).catch(err => {
          console.log(err)
          this.setState({ auth: false, role: '', loggedInUser: ''});
        });
    }

   },  1000 * 60 * 5); 
  }

  logoutHandler = () => {
    if(this.state.auth){
      axios_mongo.post('/auth/logout').then(res => {
        this.setState({ auth: false, role: '', loggedInUser: ''});
      }).catch(err => {
        console.log(err);
        this.setState({ auth: false, role: '', loggedInUser: ''});
      });
    }
  } 

  render(){
    return(
      <>
        <Layout authed={this.state.auth} logOut={this.logoutHandler} userInfo={this.state.loggedInUser} >
          <Switch>
              {this.state.auth ?<Route path='/dashboard' exact component={() => <Dashboard role={this.state.loggedInUser.role}  userInfo={this.state.loggedInUser} />} /> : <Route path='/' exact component={() => <Login authedHandler={this.authedHandler} /> } />  }
              <Route path='/' exact component={() => <Login authedHandler={this.authedHandler} /> } />
              <Route path="*">
                <Redirect to='/' />
              </Route>
          </Switch>
        </Layout>
      </>
    );
  };
}

export default App;
