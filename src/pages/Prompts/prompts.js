import React from 'react';
import { useState, useEffect } from "react";
import Modal from '../../components/Prompts/UploadPrompt/UploadPrompt';
import './prompts.css';
import { database, auth } from "./../../firebase";
import { ref, onValue } from "firebase/database";

import PromptBox from './../../components/Prompts/PromptBox/PromptBox';
import './../alignPages.css'
import { ReactComponent as Loading } from './../../images/loading.svg';

/**
 * Prompts Page
 *  Displays user prompts if logged in, polls database for updates to prompt data
 *  Creates prompt boxes from JSON data pulled from real time database.
 * @returns Prompt Upload Interface
 */
const Prompts = () => {
    const [openModal, setOpenModal] = useState(false);
    const [loaded, setLoad] = useState(false);
    const [arr, setArr] = useState([]);
    const [data, setData] = useState(null);
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState({});

    useEffect(() => {
        const load = setTimeout(() => {
            setLoad(true);
        }, 1000);
        return () => clearTimeout(load);
    }, [])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
                setLoggedIn(true);
                // user is signed in                
            } else {
                setUser("not signed in");
                setLoggedIn(false);
                // user is signed out
            }
        });
        return unsubscribe;
    }, [])

 
    /**
     * Onvalue pings this listener every time that this page is rendered and there
     * is an update to the prompt reference in the database.
     */
    useEffect(() => {
        const promptRef = ref(database, 'users/' + user.uid + "/prompts/");
        const result = onValue(promptRef, (snapshot) => {
            setData(snapshot.val());
        });
        return result;
    }, [user])

   
    useEffect(() => {
        var tempArray = [];
        if (data !== null && setLoad) {
            Object.keys(data).forEach(function (key) {
                if ((data[key].name) !== undefined) {
                    tempArray.push(data[key]);
                }
            })
            const result = setArr(tempArray);
            return result;
        }
    }, [data, setLoad])

    /**
     * load prompt boxes
     * @returns A rendered container full of Prompt Box components
     */
    function loadPromptBoxes() {
        if (loaded && arr !== []) {
            return (<ul className="ulAlign">{arr.map(item => (<PromptBox name={item.name} prompt={item.prompt} userID={user.uid} />))}</ul>);
        } else {
            return (<Loading />);
        }
    }

    if (loggedIn) {
        return (
            <div className="pageHeight">
                <div className="modalSection">
                    <button
                        className="openModalBtn"
                        onClick={() => {
                            setOpenModal(true);
                        }}> Upload New Prompt </button>
                </div>

                {openModal && <Modal closeModal={setOpenModal} />}

                <div className="">
                    {loadPromptBoxes()}
                    {/* <ul className= "ulAlign">{arr.map(item => (<PromptBox name={item.name} prompt={item.prompt} userID={userID}/>))}</ul> */}
                </div>
            </div>
        );
    }
    else {
        return (

            <div className="pageHeight">
                <div className="errorPrompt"> Please Log In to Create and Play Custom Prompts! </div>
            </div>
        );
    }

};

export default Prompts;