import {React,useEffect, useState} from 'react';
import {ref, remove, onValue} from "firebase/database";
import {database} from "../../../firebase";
import EditPrompt from "../EditPrompt/EditPrompt";
import {useNavigate} from "react-router-dom";
import './PromptBox.css';
import { auth } from "../../../firebase";

function PromptBox({name, prompt, userID}){
    const navigate = useNavigate();
    const [openEdit, setOpenEdit] = useState();
    const [highWPM, setHighWPM] = useState(0);
    const [highACC, setHighACC] = useState(0);
    const [highTime, setHighTime] = useState(0);
    const promptRef = ref(database, 'users/' + userID + "/prompts/" + name);

    /**
     * Removes the prompt from the database.
     */
    function deletePrompt(){
        remove(promptRef);
        console.log("deleted");
        localStorage.clear();
        window.location.reload();
    }
   
    /**
     * Selects the prompt to be played nad places it in local storage.
     */
    function playPrompt(){
        var data = {"name": name, "prompt": prompt};
        localStorage.setItem("name", JSON.stringify(data));
        navigate('/TypefrogPage');
    }

    /**
     * Determines the length of the prompt to ensure it fits within the possible sizes.
     * @returns  trimmed prompt string 
     */
    function determineLength(){
      if(prompt.length >= 150){
        return (<>{prompt.substring(0,150) + "..."}</>);
      }else{
        return (<>{prompt}</>);
      }
    }

    /**
     * get current WPM and accuracy high scores for a specific prompt
     */
    useEffect(() => {
      const user = auth.currentUser;
      if (user) {
        const promptRef = ref(
          database,
          "users/" + user.uid + "/prompts/" + name + "/stats/classic"
        );
        const result = onValue(promptRef, (snapshot) => {
          try{
            setHighWPM(snapshot.val().wpm);
            setHighACC(snapshot.val().accuracy);
          }catch(err){
            console.log(err);
          }
        });
        return result;
      }
    }, [name]);
  
    /**
     * Listens for user login
     */
    useEffect(() => {
      const user = auth.currentUser;
      if (user) {
        const promptRef = ref(
          database,
          "users/" + user.uid + "/prompts/" + name + "/stats/survival"
        );
        const result = onValue(promptRef, (snapshot) => {
          setHighTime(snapshot.val().highTime);
        });
        return result;
      }
    }, [name]);


    /**
     * If a user is editing a specific prompt, return that edit prompt component instead of the normal component
     */
    if(openEdit){
        return(
            <div>
            {openEdit && <EditPrompt closeEdit={setOpenEdit} name={name} prompt={prompt}/>}
            </div>
        );
    }

    return(
      <div className = "PromptContainer">
      <div className= "PromptTitle">
        {name}
      </div>
      <div className="highScores">
        <p className="score">Best WPM: {highWPM}</p> <p className="score">Best Accuracy: {highACC}</p>
        <p className="score">Best Time: {highTime}</p>
      </div>
      <hr className="break"></hr>
      <div className = "PromptBody">
        <p>{determineLength()}</p>
       
      </div>
     
      <div className="PromptFooter">
        <button className="promptButton"
          onClick={() => {
              deletePrompt();
          }}
          >Delete Prompt</button>
        <button className="promptButton"
          onClick={() => {
              setOpenEdit(true);
          }}
          >Edit Prompt</button>
          
        <button className="promptButton"
          onClick={() => {
              playPrompt();
              navigate('/');
          }}
          >Play Prompt</button>
      </div>
    </div>
  )
  
}
export default PromptBox;