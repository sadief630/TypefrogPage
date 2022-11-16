import { auth } from "../../firebase";
import { ref, set } from "firebase/database";
import { database } from "../../firebase";

/**
 * Handles the storage of total words statistics
 * @param {*} wordsTypedInGame the number of words typed before ending game
 * @param {*} totalWords the name of the statistic being stored
 * @param {*} totalPrompts the number of prompts you've created
 */

function Totals(wordsTypedInGame, totalWords, totalPrompts) {
  const user = auth.currentUser;
  var total = totalWords + wordsTypedInGame + 1;
  if (user) {
    set(ref(database, "users/" + user.uid + "/records"), {
      totalPrompts: totalPrompts,
      totalWords: total
    });
  }
}

/**
 * Handles the storage of wpm and accuracy statistics
 * @param {*} dataType the name of the statistic being stored
 * @param {*} value the value of the statistic being stored
 * @param {*} highWPM the current high score WPM
 * @param {*} highACC the current high score ACC
 * @param {*} name the name of the prompt where stats are recorded to
 */

export const recordStats = (dataType, value, highWPM, highACC, name) => {

  const user = auth.currentUser;
  // Only executes if a user is signed in
  if (user) {
    if (dataType === "accuracy") {
      // If there's a new high score in accuracy, it is stored in the database
      if (highACC !== null) {
        if (value > highACC) {
          set(
            ref(database, "users/" + user.uid + "/prompts/" + name + "/stats/classic"),
            {
              accuracy: value,
              wpm: highWPM,
            }
          );
        }
      } 
      // If there was no current high score, the current score is the high score
      else {
        set(
          ref(database, "users/" + user.uid + "/prompts/" + name + "/stats/classic"),
          {
            accuracy: value,
            wpm: highWPM,
          }
        );
      }
    }
    // If there's a new high score in wpm, it is stored in the database
    if (dataType === "wpm") {
      if (highWPM !== null) {
        if (value > highWPM) {
          set(
            ref(database, "users/" + user.uid + "/prompts/" + name + "/stats/classic"),
            {
              accuracy: highACC,
              wpm: value,
            }
          );
        }
      } 
      // If there was no current high score, the current score is the high score
      else {
        set(
          ref(database, "users/" + user.uid + "/prompts/" + name + "/stats/classic"),
          {
            accuracy: highACC,
            wpm: value,
          }
        );
      }
    }
  }
};

/**
 * Handles the storing of the time survived statistic
 * @param {*} value the value of the statistic being stored
 * @param {*} highTime the current highest time you've survived in survival mode
 * @param {*} name the name of the prompt where stats shoudl be recorded to
 */

export const recordStatsSurvival = (value, highTime, name) => {
  const user = auth.currentUser;
  // Only executes if a user is signed in
  if (user) {
    // If there's a new high score in survival time, it is stored in the database
    if (highTime !== null) {
      if (value > highTime) {
        set(
          ref(database, "users/" + user.uid + "/prompts/" + name + "/stats/survival"),
          {
            highTime: value
          }
        );
      }
    } 
    // If there was no current high score, the current score is the high score
    else {
      set(
        ref(database, "users/" + user.uid + "/prompts/" + name + "/stats/survival"),
        {
          highTime: value
        }
      );
    }
  }
}

export { Totals };
