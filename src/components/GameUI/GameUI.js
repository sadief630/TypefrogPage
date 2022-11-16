import { React, useState, useEffect, useRef } from "react";
import randomWords from "random-words";
import "./GameUI.css";
import { auth } from "../../firebase";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase";
import { recordStats, recordStatsSurvival, Totals } from "./RecordStats";
import { WelcomeMessage } from "./WelcomeMessage/WelcomeMessage";

const A = 65;
const BACKSPACE = 8;
const ENTER = 13;
const NINEKEY = 57;
const SEMICOLON = 186;
const SINGLEQUOTE = 222;
const SPACEBAR = 32;
const Z = 90;
const ZEROKEY = 48;

let inputs = ""
let letterIndexOfPrevWord
let numb_of_words = 40
let seconds
let secondsRemaining = 0
let gamemode = -1
let doc = document.getElementById("prompt")
let wordIndex = 0
let wpm = 0
let timeDivisor = 1
let survivalInterval = .1 / 1.02
let timeInGame = 0;
let wordsTypedInGame = 0;

/**
 * Creates and displays the game to the user, evaulatues inputs as typed, and records the data collected.
 * @returns The game found on the home tab.
 */
function Game() {
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [highWPM, setHighWPM] = useState(0);
  const [highACC, setHighACC] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [totalPrompts, setTotalPrompts] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [currInput, setCurrInput] = useState("");
  const [currChar, setCurrChar] = useState("");
  const [user, setUser] = useState();
  const [countDown, setCountdown] = useState(null);
  const [name, setName] = useState(null);
  const [words, setWords] = useState([]);
  const [status, setStatus] = useState("waiting");
  const textInput = useRef(null);
  const [highTime, setHighTime] = useState();


  /**
   * Checks to see if a user is signed in or not
   */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("not signed in");
      }
    });
    return unsubscribe;
  }, []);

  /**
   * Gets Total Words to be Incremented
   */
  useEffect(() => {
    if (user) {
      const promptRef = ref(database, "users/" + user?.uid + "/records");
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
  }, [user]);

  /**
   * Prepares the words to be typed
   */
  useEffect(() => {
    setWords(generateWords());
  }, []);

  /**
   * Allows the user to begin typing when the game begins
   */
  useEffect(() => {
    if (status === "started") {
      textInput.current.focus();
    }
  }, [status]);

  /**
   * Loads the prompt to determine whether it's user-entered or to be randomly generated
   */
  useEffect(() => {
    if (localStorage.getItem("name") !== null) {
      setName(JSON.parse(localStorage.getItem("name")).name);
      var playerSelectedPrompt = JSON.parse(
        localStorage.getItem("name")
      ).prompt;
      if (playerSelectedPrompt !== "") {
        setWords(playerSelectedPrompt.split(/[ :\n:\t]/));
      }
    } else {
      setName("Random");
    }
  }, []);

  /**
   * Gets the highest recorded WPM from the database
   */
  useEffect(() => {
    if (user) {
      const promptRef = ref(
        database,
        "users/" + user.uid + "/prompts/" + name + "/stats/classic"
      );
      const result = onValue(promptRef, (snapshot) => {
        setHighWPM(snapshot.val().wpm);
        setHighACC(snapshot.val().accuracy);
      });
      return result;
    }
  }, [user, name]);


  /**
   * Gets the highest recorded time survived from the database
   */
  useEffect(() => {
    if (user) {
      const promptRef = ref(
        database,
        "users/" + user.uid + "/prompts/" + name + "/stats/survival"
      );
      const result = onValue(promptRef, (snapshot) => {
        try {
          setHighTime(snapshot.val().highTime);
        } catch (err) {
          setHighTime(0);
        }

      });
      return result;
    }
  }, [user, name]);

  /**
   * Shows the user their best WPM if signed in
   * @returns Either the user's best WPM or a message saying they should log in to record their best WPM.
   */

  function ShowBestWPM(highWPM, wpm) {
    if (wpm > highWPM) {
      setHighWPM(wpm);
    }
    const user = auth.currentUser;
    if (user) {
      return <p className="stats">Highest WPM: {highWPM}</p>;
    } else {
      return <p>Login to record your best WPM!</p>;
    }
  }

  /**
   * Shows the user their longest time survived if signed in
   * @returns Either the user's longest time survived or a message saying they should log in to record their longest time survived.
   */
  function ShowBestTime(highTime, time) {
    if (time > highTime) {
      setHighTime(time);
    }
    const user = auth.currentUser;
    if (user) {
      return <p className="stats">Best Survival Time: {highTime}</p>;
    } else {
      return <p>Login to record your best Survival Time!</p>;
    }
  }

  /**
   * Shows the user their best accuracy if signed in
   * @returns Either the user's best accuracy or a message saying they should log in to record their best acuracy.
   */
  function ShowBestACC(highACC, acc) {
    if (acc > highACC) {
      setHighACC(acc);
    }
    const user = auth.currentUser;
    if (user) {
      return <p className="stats">Highest Accuracy: {highACC}%</p>;
    } else {
      return <p>Login to record your best accuracy!</p>;
    }
  }

  /**
   * Reloads the page to send them back to the homescreen
   */
  function reloadPage() {
    window.location.reload(false);
  }

  /**
   * Sets the timer to the specified amount by the button
   */
  async function timer() {
    if (status === "waiting") {
      seconds = document.getElementById("seconds").value;
      if (seconds === "Restart") {
        seconds = 45;
      }
      setCountdown(seconds);
      secondsRemaining = seconds;
    }
    setStatus("started");
    let interval = setInterval(() => {
      if (gamemode === 1) {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 0) {
            clearInterval(interval);
            setStatus("finished");
            Totals(wordsTypedInGame, totalWords, totalPrompts);
            setCurrInput("");
            return seconds;
          } else {
            secondsRemaining = prevCountdown - 1;
            timeInGame = timeInGame + 1
            return secondsRemaining;
          }
        });
      }
      else if (gamemode === 2) {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 0) {
            clearInterval(interval)
            setStatus('finished');
            Totals(wordsTypedInGame, totalWords, totalPrompts);
            setCurrInput("")
            return seconds
          }
          else {
            if (survivalInterval < 1) {
              survivalInterval = survivalInterval * 1.002
            }
            secondsRemaining = prevCountdown - survivalInterval
            if (secondsRemaining < 0) {
              secondsRemaining = 0;
            }
            timeInGame = timeInGame + .1
            return parseFloat(secondsRemaining.toFixed(1))
          }
        })
      }
    }, 1000 / timeDivisor);
  }

  /**
   * Sets the gamemode to Classic Mode and preps game for play.
   */
  function gamemode1() {
    gamemode = 1;
    reset();
    timer();
  }

  /**
   * Sets the gamemode to Survival Mode and preps game for play.
   */
  function gamemode2() {
    gamemode = 2;
    timeDivisor = 10;
    reset();
    timer();
  }

  /**
   * Resets all variables to the default.
   */
  function reset() {
    inputs = "";
    wordIndex = 0;
    timeInGame = 0;
    wordsTypedInGame = 0
    survivalInterval = .1 / 1.002
    setCorrect(0);
    setIncorrect(0);
    setCurrCharIndex(0);
    setCurrChar("");
  }

  /**
   * Generates an array for the index of each word typed, as well as one filled with randomly generated words
   * @returns An array of words to be used as the prompt
   */
  function generateWords() {
    letterIndexOfPrevWord = new Array(numb_of_words);
    setCurrCharIndex(0);
    return new Array(numb_of_words).fill(null).map(() => randomWords());
  }

  /**
   * Calculates the words per minute that the user was typing at during the prompt
   * @returns the calculated wpm from the typing prompt
   */
  function getWPM() {
    if (timeInGame === 0) {
      timeInGame = 1;
    }
    wpm = Math.round((correct / 5) * (60 / (seconds - secondsRemaining)));
    return wpm;
  }


  /**
   * Highlights the characters of the prompt based on if it is the current character to be typed or if the previous character typed was correct or incorrect
   * @param {*} wordIdx The index of the word in the prompt
   * @param {*} charIdx The index of the character in the prompt
   * @param {*} char The actual character in the prompt
   * @returns The class name for that character
   */
  function cursorHighlighter(wordIdx, charIdx, char) {
    // The current character that should be typed should be designated as yellow
    if (wordIdx === wordIndex && charIdx === currCharIndex) {
      return "highlighted";
    }
    // If the previous character was correct, designate the character as green
    else if (
      wordIdx === wordIndex &&
      charIdx === currCharIndex - 1 &&
      char === currChar
    ) {
      return "correct";
    }
    // If the previous character was incorrect, designate the character as red
    else if (
      wordIdx === wordIndex &&
      charIdx === currCharIndex - 1 &&
      char !== currChar
    ) {
      return "incorrect";
    }
    // The remaining letters should not have special coloring
    else {
      return "";
    }
  }

  /**
   *  Checks whether the typed input matches what the prompt is expecting.
   */
  function checkMatch() {

    // Validates that the array of words is equal to the specified number of words
    if (numb_of_words !== words.length) {
      numb_of_words = words.length;
    }

    // Sets the current input as the character the user types
    let userInput = inputs.charAt(inputs.length - 1);
    setCurrChar(userInput);

    // Gets the character that the user should be typing
    let promptChar = words[wordIndex].charAt(currCharIndex);

    // Compares what the user typed to what the prompt wants
    const doesItMatch = userInput === promptChar;

    // If they match, the user is awarded a correct character type
    if (doesItMatch) {
      setCorrect(correct + 1);
      // Gives you an extra second for typing in a correct character
      if (gamemode === 2) {
        setCountdown(countDown + 1)
      }
      // The calculation for tracking how many words you typed
      if (correct % 5 === 0) {
        wordsTypedInGame = wordsTypedInGame + 1
      }
    }
    // Otherwise, the user is awarded an incorrect character type.
    else {
      setIncorrect(incorrect + 1);
    }
  }

  /**
   * Gets the key that was pressed and performs the behavior of that key pressed
   * @param {*} keyCode The numerical code of the key pressed
   * @param {*} key The actual key pressed
   */
  function handleKeyDown({ keyCode, key }) {
    // When the user presses the backspace button (as long as it isn't the first character of the first word)
    if (keyCode === BACKSPACE && (wordIndex !== 0 || currCharIndex > 0)) {
      // If the backspace button is pressed at the first character of the word, the user is brought to the previous word
      if (currCharIndex === 0) {
        wordIndex -= 1;
        // If the previous word was untyped, the user is brought to the first character of the previous word
        if (letterIndexOfPrevWord[wordIndex] === 0) {
          setCurrCharIndex(letterIndexOfPrevWord[wordIndex]);
        }
        // Otherwise, the user is brought to the character before that
        else {
          setCurrCharIndex(letterIndexOfPrevWord[wordIndex] - 1);
        }
      }

      // If the backspace button is not pressed at the first character of a word, the cursor goes to the previous character typed
      else {
        setCurrCharIndex(currCharIndex - 1);
      }

      // Regardless of index, the last character you typed is displayed as correct or incorrect
      inputs = inputs.substring(0, inputs.length - 1);
      setCurrChar(inputs.substring(inputs.length - 1));
    }

    // If the enter key is pressed, the game ends and the stats are displayed
    else if (keyCode === ENTER) {
      setStatus("finished");
      secondsRemaining = countDown;
      setCountdown(0);
      Totals(wordsTypedInGame, totalWords, totalPrompts);
    }

    // If the spacebar is hit too early, this is considered an incorrect character typed. Otherwise, this is considered as a correct character typed
    else if (keyCode === SPACEBAR) {
      if (currCharIndex !== words[wordIndex].length) {
        setIncorrect(incorrect + 1);
      } else {
        setCorrect(correct + 1);
      }
      letterIndexOfPrevWord[wordIndex] = currCharIndex;
      setCurrCharIndex(0);

      if (wordIndex === numb_of_words - 1) {
        // If the last character of the last word is typed in Classic Mode, a new prompt is generated
        if (gamemode === 1) {
          setStatus("finished");
          Totals(wordIndex, totalWords, totalPrompts);
          setCountdown(0);
        }
        // If the last character of the last word is typed in Survival Mode, a new prompt is generated
        else if (gamemode === 2) {
          Totals(wordIndex, totalWords, totalPrompts);
          wordIndex = 0
          setWords(generateWords())
          if (doc) {
            doc.textContent = words
          }
          inputs = ""
        }
      }
      else {
        wordIndex += 1;
      }
    }

    // If letters, numbers, or symbols are pressed
    else if (
      (keyCode >= A && keyCode <= Z) ||
      (keyCode >= ZEROKEY && keyCode <= NINEKEY) ||
      (keyCode >= SEMICOLON && keyCode <= SINGLEQUOTE)
    ) {
      // The index is moved to the next character and is checked to see if the correct character was typed
      setCurrCharIndex(currCharIndex + 1);
      inputs += key;
      checkMatch();
      // If the last character of the last word is typed in Classic Mode, a new prompt is generated
      if (
        (currCharIndex === words[numb_of_words - 1].length - 1) &
        (wordIndex === numb_of_words - 1) & (gamemode === 1)
      ) {
        setStatus("finished");
        Totals(wordsTypedInGame, totalWords, totalPrompts);
        setCountdown(0);
      }
      // If the last character of the last word is typed in Survival Mode, a new prompt is generated
      else if (
        (currCharIndex === words[numb_of_words - 1].length - 1) &
        (wordIndex === numb_of_words - 1) & (gamemode === 2)
      ) {
        wordIndex = 0
        setWords(generateWords())
        if (doc) {
          doc.textContent = words
        }
        inputs = ""
      }
    }
  }

  /**
   * Displays and records the results of the game.
   * @returns The results of the game as well as how it compares to the users best wpms/times.
   */
  function displayStats() {
    if (gamemode === 1) {
      return (
        <>
          <div className="column has-text-centered">
            <p className="stats is-size-5">
              Words Per Minute: {Math.round(getWPM())}
            </p>
            {recordStats("wpm", Math.round(getWPM()), highWPM, highACC, name)}
            {ShowBestWPM(highWPM, wpm)}
          </div>
          <div className="column has-text-centered">
            <div className="is-size-5">
              {" "}
              {correct !== 0 ? (
                <p className="stats has-text-info is-size-1">
                  Accuracy:{" "}
                  {Math.round((correct / (correct + incorrect)) * 100)}%
                </p>
              ) : (
                <p className="stats has-text-info is-size-1">Accuracy: 0%</p>
              )}{" "}
            </div>
            {recordStats(
              "accuracy",
              Math.round((correct / (correct + incorrect)) * 100),
              highWPM,
              highACC,
              name
            )}
            {ShowBestACC(
              highACC,
              Math.round((correct / (correct + incorrect)) * 100)
            )}
          </div>
        </>);
    } else {
      return (
        <>
          <div className="column has-text-centered">
            <p className="stats is-size-5">
              {recordStatsSurvival(parseFloat(timeInGame.toFixed(2)), highTime, name)}
              Time Survived: {parseFloat(timeInGame.toFixed(2))}
            </p>
            {ShowBestTime(highTime, parseFloat(timeInGame.toFixed(2)))}
          </div>
        </>);
    }
  }

  return (
    <div className="Game">
      {status === "waiting" && (
        <h1 className="gameHeader">{WelcomeMessage(name)}</h1>
      )}
      {status === "waiting" && (
        <div className="start-button">
          <button
            className="button is-info is-fullwidth"
            onClick={gamemode1}
          >
            Start Classic
          </button>
          <button
            className="button is-info is-fullwidth"
            onClick={gamemode2}
          >
            Start Survival
          </button>
        </div>
      )}
      {status === "started" && (
        <div className="section">
          <div className="is-size-1 has-text-centered has-text-primary">
            <h2>{countDown}</h2>
          </div>
        </div>
      )}
      {status === "started" && (
        <div className="control is-expanded section">
          <input
            className="userIn"
            ref={textInput}
            disabled={status !== "started"}
            type="text"
            onKeyDown={handleKeyDown}
            value={currInput}
            onChange={(e) => setCurrInput(e.target.value)}
          />
        </div>
      )}
      {status === "started" && (
        <div className="game">
          <div className="card">
            <div className="card-content">
              <div className="prompt">
                {words.map((word, i) => (
                  <span key={i}>
                    <span>
                      {word.split("").map((char, idx) => (
                        <span
                          className={cursorHighlighter(i, idx, char)}
                          key={idx}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                    <span> </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {status === "finished" && (
        <div className="PlayAgain">
          <div className="columns">
            <div className="column has-text-centered">
              <h1> Here are the results: </h1>
              <p className="stats is-size-5">
                Seconds Remaining: {Math.round(secondsRemaining)}
              </p>
            </div>
            {displayStats()}
            <div className="column has-text-centered">
              <strong className="stats is-size-5">
                Press Play Again to try the same prompt again.
              </strong>
            </div>
            {status === "finished" && (
              <div>
                <button
                  className="PlayAgainButton"
                  onClick={() => {
                    reset();
                    timer();
                  }}
                >
                  Play Again
                </button>
                <button
                  className="PlayAgainButton"
                  onClick={reloadPage}
                >
                  Play Something Else
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;