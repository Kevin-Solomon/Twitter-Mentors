import React from "react";

export default function InputComponent({
  handleInput,
  twittername,
  handleKeyPress,
  handleUserExists,
}) {
  return (
    <>
      <div className="search-mentor">
        <span className="twitter-handle-append">@</span>
        <input
          className="mentor-input"
          onChange={handleInput}
          value={twittername}
          onKeyPress={(event) => handleKeyPress(event.key)}
          autoFocus={true}
          placeholder={"Enter username..."}
        />
      </div>
      <button className="add-mentor-btn" onClick={handleUserExists}>
        Add Mentor
      </button>
    </>
  );
}
