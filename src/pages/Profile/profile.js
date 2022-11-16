import React from 'react';
import { useState, useEffect } from "react";
import LoginBox from '../../components/UserComponents/LoginBox/LoginBox';
import UserDisplay from '../../components/UserComponents/UserDisplay/UserDisplay';
import './profile.css';
import './../alignPages.css'
import { auth } from "../../firebase";

/**
 * Profile Page!
 * @returns Profile Interface (UserDisplay) if logged in, Login (LoginBox) if logged out
 */
const Profile = () => {

    const [renderUser, setRenderUser] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setRenderUser(true);
            }
        });
        return unsubscribe;
    }, [])

    function getDisplay(render) {
        if (render) {
            return (
                <>
                    <div className="wrapper pageHeight">
                        <div className="pHeader"><h2>Your Profile</h2></div>
                        <div className="loginSection" />
                        <UserDisplay />
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="wrapper pageHeight">
                        <div className="loginSection" />
                        <LoginBox />
                    </div>
                </>
            );
        }
    }

    return (
        <>
            {getDisplay(renderUser)}
        </>
    )
};

export default Profile;