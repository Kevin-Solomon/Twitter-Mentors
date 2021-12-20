import React, { useEffect, useState } from "react";
import "./App.css";
import InputComponent from "./InputComponent";
import MentorComponent from "./MentorComponent";

export default function Mentors() {
  const [mentorList, setMentorList] = useState(
    JSON.parse(localStorage.getItem("mentors")) || []
  );
  const [twittername, setTwittername] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchMentor() {
    setLoading(true);

    await fetch(
      `https://twitter-api-fetch-userdata.netlify.app/api/fetchUserData?username=${twittername}`
    )
      .then((res) => res.json())
      .then((data) =>
        setMentorList((oldList) => [
          {
            realName: data.data.name,
            userName: data.data.username,
            userId: data.data.id,
            pfp: data.data.profile_image_url,
          },
          ...oldList,
        ])
      );
    setTwittername("");
    setLoading(false);
  }

  function handleInput(event) {
    setTwittername(event.target.value);
  }

  function handleDelete(delMentor) {
    const newMentorsList = mentorList.filter(
      (mentor) => delMentor !== mentor.userName
    );
    setMentorList(newMentorsList);
  }

  function handleKeyPress(press) {
    return press === "Enter" ? fetchMentor() : "none";
  }

  useEffect(() => {
    localStorage.setItem("mentors", JSON.stringify(mentorList));
  }, [mentorList]);

  return (
    <div className="mentor-app">
      <section className="input-section">
        <InputComponent
          handleInput={handleInput}
          twittername={twittername}
          handleKeyPress={handleKeyPress}
          fetchMentor={fetchMentor}
        />
      </section>
      <div className="mentor-list">
        {loading ? (
          <div className="lds-dual-ring"></div>
        ) : (
          mentorList.map((mentor, id) => (
            <MentorComponent
              key={id}
              mentor={mentor}
              setMentorList={setMentorList}
              handleDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

/*
Each mentor section should show the following info:
1. Profile picture ✅
2. Name of Mentor ✅
3. A button, which on click takes the user directly to the mentor profile (in a new tab) ✅
4. A button, which on click removes the mentor from the list ✅
5. A text which could show when they last tweeted? ❌
6. Another text showing a preview of their last tweet? ✅
*/

// Task for Sunday:
// 1. Finalize styling (grid for neat layout of buttons)
// 2. LocalStorage to store prev Mentors ✅
// 3. serverless func for showing recent tweet ✅
// 4. Separate component for handling mentor tabs ✅

// Task for Monday/Tuesday:
// 1. Check for duplicate entry
// 2. Add '@' to beginning of input field
// 3. anything else based on suggestions
