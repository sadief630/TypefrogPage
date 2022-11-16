import {React, useState, useEffect} from 'react';
import './UploadPrompt.css';
import {auth} from "../../../firebase";
import {database} from "../../../firebase";
import {ref, onValue} from "firebase/database";
import {updateDatabase} from "../DatabaseUpload";

function Modal({closeModal}){
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [user, setUser] = useState({});
    const [totalPrompts, setTotalPrompts] = useState(0);
    const [totalWords,setTotalWords] = useState(0);

    //Get Real-Time User Data On Modal Load
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {setUser(user);} 
            else {setUser("not signed in");}
        });
        return unsubscribe;
    }, [])

       
    /**
     * Get Total Prompts for Potential Update
     */
    useEffect(() => {
        if(user){
            const promptRef = ref(database, 'users/' + user?.uid + "/records");
            const result = onValue(promptRef, (snapshot) => {
                try{
                    setTotalPrompts(snapshot.val().totalPrompts);
                    setTotalWords(snapshot.val().totalWords);
                }catch(err){
                    console.log(err);
                }
            });
            return result;
        }
    }, [user])

    
    return <div className="modalBackground">
        <div className="modalContainer">
            <h3>Create a Prompt</h3>
            {/* <input type="file" onChange={(event) => {setTextUpload(event.target.files[0])}}/> */}
            <div className="attributes">
                <label>Prompt Name: </label><input className="promptName"
                    maxLength="30"
                    onChange={e => setName(e.target.value)}
                ></input>
            </div>
            <h5> Paste or Type Text Below </h5>
            <div className="body">
                <textarea className="TextInput"
                    maxLength = "1000"
                    name="message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                >
                </textarea>
            </div>
            <div className="modalfooter">
                <button onClick={() => closeModal(false)}>Cancel</button>
                <button onClick ={ () => closeModal(updateDatabase(name, message, totalWords, totalPrompts))}> Upload </button>
            </div>
        </div>
    </div>;
}
export default Modal;