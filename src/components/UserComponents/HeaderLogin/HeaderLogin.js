
import { React, useState, useEffect } from 'react';
import './HeaderLogin.css';
import { signOut } from "firebase/auth";
import { database, auth } from "../../../firebase";
import { ref, onValue } from "firebase/database";
import frogMain from '../../../images/frogMain.png';

const HeaderLogin = ()  => {
    const [user, setUser] = useState({});
    const [frog, setFrog] = useState();
    const [username, setUsername] = useState();

    const logout = async () => {
        localStorage.clear();
        window.location.reload();
        await signOut(auth);
    };
    //Get Real-Time User Data On Load
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) { setUser(user); }
            else { setUser(null); }
        });
        return unsubscribe;
    }, [])

    useEffect(() => {
        if (user) {
            const promptRef = ref(database, 'users/' + user?.uid + "/preferences");
            const result = onValue(promptRef, (snapshot) => {
                try {
                    setFrog(snapshot.val().frog);
                } catch (err) {
                    console.log(err);
                    setFrog(frogMain);
                }
                try {
                    setUsername(snapshot.val().username)
                } catch (err) {
                    console.log(err);
                    setUsername(user?.email);
                }
            });
            return result;
        }
    }, [user])

    /**
     * Creates the header displayed in the Navbar.
     * @returns Conditional Header Appearance
     */
    function greet() {
        if (user) {
            return (
                <div className="headerUserContainer">
                    <img className="frogAvatar" src={frog} alt="Avatar" />
                    <div className="user">
                        Hello, {username}!
                        <div>
                            <button className="logout" onClick={logout}>Sign Out</button>
                        </div>
                    </div>
                </div>);
        } else {
            return (
                <div className="headerUserContainer">
                    <div className="login">
                        {/* Deployment Test */}
                        <a href="/TypefrogPage/#/profile"> <button type="button" className="login">Login or Create Account</button> </a>
                    </div>
                </div>);
        }
    }
    return (greet());
}

export default HeaderLogin;
