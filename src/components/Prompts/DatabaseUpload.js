
import {ref, set} from "firebase/database";
import { database, auth } from "../../firebase";


/**
 * Creates all the entries necessary for a new prompt in the database
 * Initializes references to high scores (wpm, accuracy, and best time)
 * returns an update to an open Upload modal's state.
 * @param {*} name 
 * @param {*} message 
 * @param {*} totalWords 
 * @param {*} totalPrompts 
 * @returns t/f
 */
export function updateDatabase(name, message, totalWords, totalPrompts){
    const user = auth.currentUser;
    if(name !== "" && message.length >= 15){
        set(ref(database, 'users/' + user.uid + "/prompts/" + name), {
            name: name,
            prompt: message,
        });
        set(ref(database, 'users/' + user.uid + "/prompts/" +  name + "/stats/classic"), {
            wpm: 0,
            accuracy: 0,
        });
        set(ref(database, 'users/' + user.uid + "/prompts/" +  name + "/stats/survival"), {
            highTime:0
        });
        set(ref(database, 'users/' + user.uid + "/records"), {
            totalPrompts:totalPrompts+1,
            totalWords: totalWords,
        });
        return false;
        // closeModal(false);
    }
    else{
        if(name === ""){
            alert("Prompt must have a name!");
        }
        else if(message.length < 15){
            alert("Your prompt is too short. Must be at least 15 characters.");
        }
        return true;
    }
}

/**
 * Updates all entries allowed in the Edit Prompt Box.
 * Resets high scores for that specific prompt to 0.
 * returns an update to an open Edit modal's state.
 * 
 * @param {*} message 
 * @param {*} name 
 * @returns t/f
 */
export function editDatabase(message, name){
    const user = auth.currentUser;
    if(message.length <= 15){
      alert("Prompt too short. Must be at least 15 characters.");
      console.log("Prompt too short. Must be at least 15 characters.");
      return true;
    }

    if (user) {
      if (name !== "" && (message.length >= 15)) {
        set(ref(database, "users/" + user.uid + "/prompts/" + name), {
          name: name,
          prompt: message,
        });
        set(
          ref(database, "users/" + user.uid + "/prompts/" + name + "/stats"),
          {
            wpm: 0,
            accuracy: 0,
          }
        );
        set(ref(database, 'users/' + user.uid + "/prompts/" +  name + "/stats/survival"), {
          highTime:0
        });
        return false;
      }
    } else {
      alert("Account Error. Please Sign In again or Reload your Browser.");
    }
  };