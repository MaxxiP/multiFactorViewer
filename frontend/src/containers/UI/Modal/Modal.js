import React, { useState } from 'react';
import Modal from 'react-modal';
import {ChangePassword} from '../../ChangePassword/ChangePassword';
import classes from './Modal.module.css';


Modal.setAppElement('#root')

export const ChangePasswordModal = () => {
    const [modalIsOpen, setMopdalIsOpen] = useState(false);

    function closeModal(){
        setMopdalIsOpen(false)
    }

    function openModal(){
        setMopdalIsOpen(true)
    }

    return(
        <>
            <a href='#/' style={{'textDecoration': 'none'}} onClick={openModal}>Change Password</a>
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={classes.Modal}
            >
                <div className="modal-header">
                    <h5 className="modal-title">Change password</h5>
                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <ChangePassword />           
            </Modal>
        </>
    );
}