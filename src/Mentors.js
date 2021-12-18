import React, { useEffect, useState } from "react";
import "./App.css";
import { FaTwitter, FaTrash } from "react-icons/fa";
export default function Mentors() {
  const [mentorList, setMentorList] = useState([]);
  const [twitterid, setTwitterid] = useState("");

  async function fetchMentor() {
    await fetch(
      `https://cors-anywhere.herokuapp.com/https://twitter-api-fetch-userdata.netlify.app/api/fetchUserData?username=${twitterid}`
    )
      .then((res) => res.json())
      .then((data) =>
        setMentorList((oldList) => [
          {
            realName: data.data.name,
            userName: data.data.username,
            pfp: data.data.profile_image_url,
          },
          ...oldList,
        ])
      );
    setTwitterid("");
  }

  function handleInput(event) {
    setTwitterid(event.target.value);
  }

  function handleDelete(delMentor) {
    const newMentorsList = mentorList.filter(
      (mentor) => delMentor !== mentor.userName
    );
    setMentorList(newMentorsList);
  }

  useEffect(() => {
    console.log(mentorList);
  }, [mentorList]);

  return (
    <div className="mentor-app">
      <section className="input-section">
        <input
          className="mentor-input"
          onChange={handleInput}
          value={twitterid}
        />
        <button className="add-mentor-btn" onClick={fetchMentor}>
          Add Mentor
        </button>
      </section>
      <div className="mentor-list">
        {mentorList.map((mentor, id) => (
          <section
            key={id}
            className="mentor-section"
            style={{
              display: mentor.userName ? "flex" : "none",
            }}
          >
            <img className="mentor-pfp" src={mentor.pfp} alt="pfp" />
            <p className="mentor-name">{mentor.realName}</p>
            <a
              href={`https://twitter.com/${mentor.userName}`}
              target="_blank"
              rel="noreferrer"
              title={`${mentor.userName}'s Twitter Profile`}
            >
              <FaTwitter className="profile-btn" />
            </a>
            <FaTrash
              className="delete-mentor-btn"
              onClick={() => handleDelete(mentor.userName)}
              title={`Delete ${mentor.userName}`}
            />
          </section>
        ))}
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
5. A text which could show when they last tweeted?
6. Another text showing a preview of their last tweet?
*/
