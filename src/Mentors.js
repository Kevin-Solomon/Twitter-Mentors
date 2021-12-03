import React from "react";
import axios from "axios";


function Mentors() {
  async function fetchMentor(){
    const result = await axios.get('./netlify/functions/mentorFunction')
    console.log(result)
  }

  return (
    <div>
      <button onClick={fetchMentor}>Get Mentor</button>
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
