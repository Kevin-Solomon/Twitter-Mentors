import React, { useEffect, useState } from "react";

export default function Mentors() {
  const [mentorList, setMentorList] = useState([]);
  const [twitterid, setTwitterid] = useState("");

  async function fetchMentor() {
    await fetch(`./.netlify/functions/getMentor?username=${twitterid}`)
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
    <div>
      <input onChange={handleInput} value={twitterid} />
      <button style={{ cursor: "pointer" }} onClick={fetchMentor}>
        Add Mentor
      </button>
      {mentorList.map((mentor, id) => (
        <section
          key={id}
          style={{
            display: mentor.userName ? "flex" : "none",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: "1rem",
            padding: "0.2rem",
            backgroundColor: "#bdbdbd",
          }}
        >
          <img style={{ borderRadius: "100%" }} src={mentor.pfp} alt="pfp" />
          <h3>{mentor.realName}</h3>
          <a
            href={`https://twitter.com/${mentor.userName}`}
            target="_blank"
            rel="noreferrer"
          >
            <button style={{ cursor: "pointer" }}>Visit Profile</button>
          </a>
          <button
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(mentor.userName)}
          >
            Delete Mentor
          </button>
        </section>
      ))}
    </div>
  );
}

/*
Each mentor section should show the following info:
1. Profile picture ✅
2. Name of Mentor ✅
3. A button, which on click takes the user directly to the mentor profile (in a new tab) ✅
4. A text which could show when they last tweeted?
5. Another text showing a preview of their last tweet?
*/
