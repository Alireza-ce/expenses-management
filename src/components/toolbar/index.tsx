import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/context/AuthProvider';
import classes from './toolbar.module.scss';

export default function ToolBar() {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    const current = new Date();

    function userLogOut() {
        logOut();
        localStorage.removeItem('token');
        navigate('/', { replace: false })
    }

    return (
        <div className={classes.toolbar}>
            <div className={classes.date}>{current.getDate()}/{current.getMonth()+1}/{current.getFullYear()}</div>
            <div className={classes.profileLinks}>
                <p onClick={userLogOut}>logOut</p>
                <p>Profile</p>
            </div>
        </div>
    )
}
