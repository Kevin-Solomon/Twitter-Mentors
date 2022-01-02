import React, { useState, useEffect } from "react";

export default function InputComponent({
  handleInput,
  twittername,
  handleKeyPress,
  fetchMentor,
}) {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    twittername ? setDisabled(false) : setDisabled(true);
  }, [twittername]);
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
      <button
        className="add-mentor-btn"
        onClick={fetchMentor}
        disabled={disabled}
      >
        Add Mentor
      </button>
    </>
  );
}
