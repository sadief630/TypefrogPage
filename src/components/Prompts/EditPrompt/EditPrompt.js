import { React, useState } from "react";
import "./EditPrompt.css";
import {editDatabase} from "../DatabaseUpload";


/**
 * A component that allows the user to edit a prompt entry that 
 * exists in the database.
 * Function from DatabaseUpload edits the database if submitted.
 * If cancelled, nothing is modified. 
 */
function EditPrompt({ closeEdit, name, prompt }) {
  const [message, setMessage] = useState(prompt); 
  return (
    <div className="editBackground">
      <div className="editContainer">
        <h3>Edit Prompt: {name}</h3>
        <div className="body">
          <textarea
            className="editTextInput"
            name="message"
            value={message}
            maxLength = "1000"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div>
          <p>WARNING: Updating a prompt will RESET its high scores!</p>
        </div>
        <div className="editfooter">
          <button onClick={() => closeEdit(false)}>Cancel</button>
          <button onClick={() => closeEdit(editDatabase(message, name))}> Update </button>
        </div>
      </div>
    </div>
  );
}
export default EditPrompt;
