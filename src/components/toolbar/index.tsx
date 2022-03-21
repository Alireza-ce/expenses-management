import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/context/AuthProvider';
import classes from './toolbar.module.scss';

export default function ToolBar() {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    function userLogOut() {
        logOut();
        localStorage.removeItem('token');
        navigate('/', { replace: false })
    }

    return (
        <div className={classes.toolbar}>
            <div className={classes.date}>12/23/2021</div>
            <div className={classes.profileLinks}>
                <p onClick={userLogOut}>logOut</p>
                <p>Profile</p>
            </div>
        </div>
    )
}
