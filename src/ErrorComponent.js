import React, { useState, useEffect } from "react";

export default function ErrorComponent({ userFetchErr, setUserFetchErr }) {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    userFetchErr.invalidName || userFetchErr.userExists
      ? setShowError(true)
      : setShowError(false);
  }, [userFetchErr]);
  return (
    <>
      {showError && (
        <section
          className="mentor-error-name"
          onClick={() =>
            setUserFetchErr({
              invalidName: false,
              userExists: false,
            })
          }
        >
          {userFetchErr.invalidName && (
            <p>{"Error: Could not find mentor with that username"}</p>
          )}
          {userFetchErr.userExists && <p>{"Error: Mentor already exists"}</p>}

          <br></br>
          <p>Click to close</p>
        </section>
      )}
    </>
  );
}
