import React, { useState, useEffect } from "react";

export default function ErrorComponent({ userFetchErr, setUserFetchErr }) {
  const [showError, setShowError] = useState(false);

  function clearErrors() {
    setUserFetchErr({
      invalidName: false,
      userExists: false,
      otherError: false,
    });
  }

  useEffect(() => {
    userFetchErr.invalidName ||
    userFetchErr.userExists ||
    userFetchErr.otherError
      ? setShowError(true)
      : setShowError(false);
  }, [userFetchErr]);
  return (
    <>
      {showError && (
        <section className="mentor-error-name" onClick={clearErrors}>
          {userFetchErr.invalidName && (
            <p>{"Error: Could not find mentor with that username"}</p>
          )}
          {userFetchErr.userExists && <p>{"Error: Mentor already exists"}</p>}
          {userFetchErr.otherError && (
            <p>{"Whoops! Something didn't go right"}</p>
          )}
          <br></br>
          <p>Click to close</p>
        </section>
      )}
    </>
  );
}
