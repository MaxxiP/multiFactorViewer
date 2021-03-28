import React, { useState } from 'react';
import axios_mongo from '../../axios-mongoose';

export const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");    
    const [oldPassword, setOldPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(""); 

    const onSubmit = (event) => {
        event.preventDefault();

        const passwordChangeData = {
            newPassword: newPassword,
            confirmPassword: confirmPassword,
            oldPassword: oldPassword
        }

        axios_mongo.patch('/user/user/password', passwordChangeData)
            .then(res => {
                if(res.data.message){
                    setError('');
                    setMessage(res.data.message);
                }else{
                    setMessage('');
                    setError(res.data.error);
                }
            })
            .catch(err => { 
                console.error(err.error);
                setMessage('');
                setError("Server returned an error, please contact your administrator.");
            })
    }

    return (
        <>
            <div>
                <div className="modal-body">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                        <input 
                            onChange={(event) => setNewPassword(event.target.value)} 
                            type="password" 
                            className="form-control" 
                            id="newPassword" 
                            name="newPassword"
                            minLength="8"
                            maxLength="40"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                        <input 
                            onChange={(event) => setConfirmPassword(event.target.value)} 
                            type="password" 
                            className="form-control" 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            minLength="8"
                            maxLength="40"                            
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Old Password</label>
                        <input 
                            onChange={(event) => setOldPassword(event.target.value)} 
                            type="password" 
                            className="form-control" 
                            id="oldPassword"   
                            name="oldPassword"
                            minLength="8"
                            maxLength="40"
                            />
                    </div>
                    {message ? 
                    <div className="alert alert-success" role="alert">
                    {message}
                    </div> 
                    : null}
                    
                    {error ? 
                    <div className="alert alert-warning" role="alert">
                    {error}
                    </div> 
                    : null}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                </div>
            </div>
        </>
    );
}