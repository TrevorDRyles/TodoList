import * as React from 'react';
import {useEffect, useRef, useState} from "react";
import Modal from 'react-modal'
import styles from './ListTodo.module.css'
import {useLocation} from "react-router";

function UserLanding() {
    const location = useLocation();
    const formData = location.state;
    return (
        <div>
            <div>User: {formData.username}</div>
        </div>
    );
}

export default UserLanding;
