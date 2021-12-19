import React, { useEffect, useState } from "react";
import "./App.css";
import { FaTwitter, FaTrash, FaExpandAlt } from "react-icons/fa";

export default function Mentors() {
  const [mentorList, setMentorList] = useState([]);
  const [twittername, setTwittername] = useState("");
  const [loading, setLoading] = useState(false);

  async function getRecentTweet(userid) {
    setLoading(true);
    await fetch(
      `https://twitter-api-fetch-userdata.netlify.app/api/fetchRecentTweet?userID=${userid}`
    )
      .then((res) => res.json())
      .then((data) =>
        setMentorList((oldList) =>
          oldList.map((mentor) =>
            mentor.userId === userid
              ? {
                  ...mentor,
                  recentTweet: {
                    id: data.data[0].id,
                    text: `${data.data[0].text
                      .split(" ")
                      .slice(0, 10)
                      .join(" ")}...`,
                  },
                }
              : mentor
          )
        )
      );
    setLoading(false);
  }

  async function fetchMentor() {
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
    console.log(mentorList);
  }, [mentorList]);

  return (
    <div className="mentor-app">
      <section className="input-section">
        <input
          className="mentor-input"
          onChange={handleInput}
          value={twittername}
          onKeyPress={(event) => handleKeyPress(event.key)}
          autoFocus={true}
        />
        <button className="add-mentor-btn" onClick={fetchMentor}>
          Add Mentor
        </button>
      </section>
      <div className="mentor-list">
        {mentorList.map((mentor, id) => (
          <div
            key={id}
            style={{
              display: mentor.userName ? "flex" : "none",
            }}
            className="mentor-main"
          >
            <section
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
            <section className="mentor-recent-tweet">
              {mentor.recentTweet ? (
                <a
                  href={`https://twitter.com/${mentor.userName}/status/${mentor.recentTweet.id}`}
                  target="_blank"
                  rel="noreferrer"
                  title="View Tweet"
                >
                  <p>{mentor.recentTweet.text}</p>
                </a>
              ) : loading ? (
                <div className="lds-dual-ring"></div>
              ) : (
                <p onClick={() => getRecentTweet(mentor.userId)}>
                  <FaExpandAlt /> Show Recent Tweet
                </p>
              )}
            </section>
          </div>
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
5. A text which could show when they last tweeted? ❌
6. Another text showing a preview of their last tweet? ✅
*/

// Task for Sunday:
// 1. Finalize styling (grid for neat layout of buttons)
// 2. LocalStorage to store prev Mentors
// 3. serverless func for showing recent tweet ✅
