import { TimeSelector } from "../TimeSelector/TimeSelector";
import "../GameUI.css"

/**
 * Shows a welcome message, dependent on if the prompt is with random words
 * @param {*} name The name of the prompt that is to be played (Random if no custom prompt is chosen)
 * @returns The welcome message to be displayed to the user
 */
export const WelcomeMessage = (name) => {

  /**
   * Clears the current prompt chosen and refreshes the page
   */
  function unset() {
    localStorage.clear();
    window.location.reload();
  }

  // Displays the Welcome Message for a prompt that is a randomly generated one
  if (name === "Random") {
    return (
      <div className="gameHeader">
        {" "}
        Welcome to TypeFrog!
        <div className="gameHeader2">
          Press Start to Type with Randomly Generated Words.
          <div>
            <a href="/TypefrogPage/#/prompts">
              <button className="optionButton2" type="button">
                {" "}
                Choose or Create a Custom Prompt
              </button>{" "}
            </a>
          </div>
        </div>
        <br></br>
        <TimeSelector />
      </div>
    );
  }
  // Displays the Welcome Message for a user prompt
  else {
    return (
      <div>
        Press Start To Type "{name}!"
        <div className="options">
          <button
            className="optionButton"
            type="button"
            onClick={() => {
              unset();
            }}
          >
            Play With Random Words
          </button>
          <a href="/TypefrogPage/#/prompts">
            <button className="optionButton" type="button">
              Choose a Different Prompt
            </button>{" "}
          </a>
          <br></br>
        </div>
        <TimeSelector />
      </div>
    );
  }
}