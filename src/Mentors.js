import React, { useState } from "react";

function Mentors() {
  const [name, setName] = useState("");

  async function fetchMentor() {
    fetch('./.netlify/functions/getMentor').then((res) => res.json()).then(data => setName(data))
  }

  return (
    <div>
      <button onClick={fetchMentor}>Get Mentor</button>
      <p>{name && name.data.name}</p>
      <img src={name && name.data.profile_image_url} alt="pfp" />
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
