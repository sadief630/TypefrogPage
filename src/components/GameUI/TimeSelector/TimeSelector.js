import { React } from "react";
import "./TimeSelector.css";

/**
 * Displays the amount of time a user can select
 * @returns Options for the amount of seconds to type a prompt
 */
export const TimeSelector = () => {
  return (
    <div>
      <select className="options-select" name="seconds" id="seconds">
        <option value="Restart" defaultValue="45">
          Seconds
        </option>
        <option value="15">15</option>
        <option value="30">30</option>
        <option value="45">45</option>
        <option value="60">60</option>
        <option value="75">75</option>
        <option value="90">90</option>
        <option value="105">105</option>
        <option value="120">120</option>
      </select>
    </div>
  );
};
