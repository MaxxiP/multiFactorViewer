import React, { Component } from 'react';
import axios_mongo from '../../../axios-mongoose';
import FullUser from '../FullUser/FullUser';
import { FaTrash, FaPen } from 'react-icons/fa';

class UserList extends Component{
    state={ 
        users: [],
        user: {},
        selectedUser: '',
        error: false,
        updated: false
    }

    componentDidUpdate(){
        if(this.state.updated || this.props.shouldUpdate){
            this.getUser();
            this.setState({ updated: false });
        }
    }

    componentDidMount(){
        this.getUser();
    }

    getUser = () => {
        axios_mongo.get('/user/users')
            .then(res => {
                const fetchedUsers = [];

                for (let key in res.data){
                    fetchedUsers.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, users: fetchedUsers })
            })
            .catch(err => {
                console.error(err);
                this.setState({ loading: false, error: true });
        });
    }

    userClickHandler = (id) => {
        axios_mongo.get('/user/user/' + id ) 
        .then(res => {
            this.setState({ 
                user: res.data,
                selectedUser: id
            });
        })
        .catch(err => console.error(err));
    }

    unselectClickhandler = () => {
        this.setState({ selectedUser: '' });
    }

    userDeleteHandler = (id) => {
        axios_mongo.delete('/user/user/' + id )
            .then(res => {
                this.setState({ updated: true });
            })
            .catch(err => console.error(err));
    }


    userUpdateHandler = () => {
        this.setState({ updated: true });
    }

    render(){ 
        if(!this.state.error){
                return(
                    <div className="card mb-5">
                        <div className="card-header">
                        <h3>Userlist</h3>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped"> 
                                <thead> 
                                    <tr>
                                        <th>Name</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.users.map(user => (
                                        <tr key={user.createdAt}>
                                            <td className="col-sm-2" key={user.mail}>{user.name}</td>
                                            <td  key={user.name} ><FaPen onClick={() => this.userClickHandler(user._id)}/></td>
                                            <td  key={user.id} ><FaTrash onClick={() => {if(window.confirm('Delete the item?'))this.userDeleteHandler(user._id)}} /> </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {this.state.selectedUser ? <div className="card-footer"><FullUser selectedUser={this.state.selectedUser} user={this.state.user} update={this.userUpdateHandler} unselect={this.unselectClickhandler}/> </div> : null }
                        
                    </div>
                );
        }else{
            return(<p>An error occured</p>);
        }
    }
};

export default UserList;