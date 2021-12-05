import React, { useState } from "react";

function Mentors() {
  const [name, setName] = useState("");

  async function fetchMentor() {
    const result = await fetch('./.netlify/netlify/functions/getMentor')
    // const data = await result.json()
    // console.log(result)
  }

  return (
    <div>
      <button onClick={fetchMentor}>Get Mentor</button>
      <p>{name}</p>
    </div>
  );
}

export default Mentors;

/*
Each mentor section should show the following info:
1. Profile picture
2. Name of Mentor
3. A button, which on click takes the user directly to the mentor profile (in a new tab)
4. A text which could show when they last tweeted?
5. Another text showing a preview of their last tweet?
*/
