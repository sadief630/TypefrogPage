import React from 'react';
import { useState, useEffect } from "react";
import './UserDisplay.css'
import {database, auth} from "../../../firebase";
import { ref, set, onValue } from "firebase/database";
import frog1 from '../../../images/frog1.png';
import frog2 from '../../../images/frog2.png';
import frog3 from '../../../images/frog3.png';
import frog4 from '../../../images/frog4.png';
import frog5 from '../../../images/frog5.png';
import frog6 from '../../../images/frog6.png';
import frogMain from '../../../images/frogMain.png';
import frogAlt from '../../../images/frogAlt.png';
import frogLogo from '../../../images/frogLogo.png';
import tadpole from '../../../images/tadpole.png';

/**
 * User Display
 * @returns Profile Display for Logged-In Users.
 */

const UserDisplay = () => {
    const [frogPhotosSelectedID, setFrogPhotosSelectedID] = useState("Typo");
    const [totalWords, setTotalWords] = useState(0);
    const [totalPrompts, setTotalPrompts] = useState(0);
    const [username, setUsername] = useState();
    const [date, setDate] = useState();
    const [frogpic, setFrogpic] = useState(null);
    const [status, setStatus] = useState("normal");
    const [user, setUser] = useState({});

    /**
     * Get current User
     */
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);

                // user is signed in
            } else {
                setUser(null);
                // user is signed out
            }
        });
        return unsubscribe;
    }, [])

    /**
     * Get Total Words and Prompts for View
     */
    useEffect(() => {
        if (user) {
            const promptRef = ref(database, 'users/' + user?.uid + "/records");
            const result = onValue(promptRef, (snapshot) => {
                try {
                    setTotalPrompts(snapshot.val().totalPrompts);
                    setTotalWords(snapshot.val().totalWords);
                } catch (err) {
                    console.log(err);
                }
            });
            return result;
        }
    }, [user])

    /**
     * Get Date Joined, Frog Pic, and other prefences (username)
     */
    useEffect(() => {
        if (user) {
            try {
                var tempdate = new Date(user.metadata.creationTime)
                setDate((tempdate.getMonth() + 1) + "/" + (tempdate.getDate()) + "/" + tempdate.getFullYear())
            } catch (err) {
                console.log(err);
            }
            const promptRef = ref(database, 'users/' + user.uid + "/preferences");
            const result = onValue(promptRef, (snapshot) => {
                //setData(snapshot.val());
                try {
                    if (snapshot.val().frog === undefined) {
                        setFrogpic(frogMain);
                    } else {
                        setFrogpic(snapshot.val().frog);
                    }

                } catch (err) {
                    console.log(err);
                    setFrogpic(frogMain);
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
     * Save Profile Updates to Database.
     */
    const saveToDatabase = () => {
        if (username.length < 6) {
            alert("Username must be at least six characters!");
        } else {
            set(ref(database, 'users/' + user.uid + "/preferences"), {
                frog: frogpic,
                username: username
            });
            alert("Your changes have been saved.");
            setStatus("normal");
        }
    }

    /**
     * Handle Username State
     */
    const editUserName = () => {
        setStatus("editUsername")
        console.log(status);
    }

    /**
     * Handle current input for username
     * @param {*} e 
     */
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    /**
     * Handle Frog Selected
     * @param {*} ID 
     */
    function markFrog(ID) { //creates border

        // clear any other borders that might be set
        document.getElementById(frogPhotosSelectedID).classList.remove("frogPhotosSelected");

        // Then set the one that got clicked.
        document.getElementById(ID).classList.add("frogPhotosSelected");

        setFrogPhotosSelectedID(ID);
    }

    /**
     * Return Container with Account Info
     */
    return (
        <>
            <div className="accountInfoHeader">
                <h4>Account Info</h4>
            </div>
            <div className="accountInfo">
                <p>Email:&emsp; {user?.email} </p>
                {status === "normal" && (
                    <p className="userName">Username:&emsp; {username}
                        <button className="smallSaveButton" id="editUserName" onClick={() => { editUserName() }}> Edit Username </button>
                    </p>)}

                {status === "editUsername" && (
                    <p>
                        Username:&emsp;
                        <input className="EditProfileText" id="EditProfileText" maxLength="30" type='text' onChange={handleUsernameChange} defaultValue={username} />
                        <button className="smallSaveButton" onClick={() => { saveToDatabase() }}> Save </button>
                    </p>
                )}
                <p>Date Joined:&emsp; {date}</p>
                <p>Total Prompts Created:&emsp; {totalPrompts}</p>
                <p>Total Words Typed:&emsp; {totalWords} </p>
            </div>

            <div className="avatarSelector">
                <h4>
                    Select Your Avatar
                </h4>
                <div className="">
                    <div className="frogcontainer">
                        <div className="card">
                            <img className="frogphotos" id="Typo" onClick={() => { setFrogpic(frogMain); markFrog("Typo") }} src={frogMain} alt="Typo" />
                            <img className="frogphotos" id="Alto" onClick={() => { setFrogpic(frogAlt); markFrog("Alto") }} src={frogAlt} alt="Alto" />
                            <img className="frogphotos" id="James" onClick={() => { setFrogpic(frog5); markFrog("James") }} src={frog5} alt="James" />
                            <img className="frogphotos" id="Andrew" onClick={() => { setFrogpic(frog1); markFrog("Andrew") }} src={frog1} alt="Andrew" />
                            <img className="frogphotos" id="Sadie" onClick={() => { setFrogpic(frog2); markFrog("Sadie") }} src={frog2} alt="Sadie" />
                            <img className="frogphotos" id="Ethan" onClick={() => { setFrogpic(frog3); markFrog("Ethan") }} src={frog3} alt="Ethan" />
                            <img className="frogphotos" id="Calvin" onClick={() => { setFrogpic(frog4); markFrog("Calvin") }} src={frog4} alt="Calvin" />
                            <img className="frogphotos" id="Bryce" onClick={() => { setFrogpic(frog6); markFrog("Bryce") }} src={frog6} alt="Bryce" />
                            <img className="frogphotos" id="Logo" onClick={() => { setFrogpic(frogLogo); markFrog("Logo") }} src={frogLogo} alt="Logo" />
                            <img className="frogphotos" id="Tadpole" onClick={() => { setFrogpic(tadpole); markFrog("Tadpole") }} src={tadpole} alt="Tadpole" />
                        </div>
                    </div>
                    <button className="saveButton" onClick={() => { saveToDatabase() }}>Save Avatar</button>
                </div>
            </div>
        </>
    );
}

export default UserDisplay;