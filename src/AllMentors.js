import React, { useEffect, useState } from "react";
import "./App.css";
import ErrorComponent from "./ErrorComponent";
import InputComponent from "./InputComponent";
import MentorComponent from "./MentorComponent";

export default function Mentors() {
  const [mentorList, setMentorList] = useState(
    JSON.parse(localStorage.getItem("mentors")) || []
  );
  const [twittername, setTwittername] = useState("");
  const [loading, setLoading] = useState(false);
  const [userFetchErr, setUserFetchErr] = useState({
    invalidName: false,
    userExists: false,
  });

  async function fetchMentor() {
    setLoading(true);
    await fetch(
      `https://twitter-api-fetch-userdata.netlify.app/api/fetchUserData?username=${twittername}`
    )
      .then((res) => res.json())
      .then((data) =>
        data.errors ? handleUserError() : updateMentors(data.data)
      );
    setTwittername("");
    setLoading(false);
  }

  function updateMentors(newMentor) {
    setMentorList((oldList) => [
      {
        realName: newMentor.name,
        userName: newMentor.username,
        userId: newMentor.id,
        pfp: newMentor.profile_image_url,
      },
      ...oldList,
    ]);

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
    return press === "Enter" ? handleUserExists() : "none";
  }

  function handleUserError() {
    setUserFetchErr((oldList) => ({ ...oldList, invalidName: true }));
  }

  function handleRepeatUser(){
    setUserFetchErr((oldList) => ({ ...oldList, userExists: true }))
    setTwittername("");
  }

  function handleUserExists() {
    mentorList.length > 0
      ? mentorList.map((mentor) =>
          twittername === mentor.userName
            ? handleRepeatUser()
            : fetchMentor()
        )
      : fetchMentor();
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
          handleUserExists={handleUserExists}
          userFetchErr={userFetchErr}
          loading={loading}
        />
      </section>
      <ErrorComponent
        userFetchErr={userFetchErr}
        setUserFetchErr={setUserFetchErr}
      />
      <div className="mentor-list">
        {loading && <div className="lds-dual-ring"></div>}
        {mentorList.map((mentor, id) => (
          <MentorComponent
            key={id}
            mentor={mentor}
            setMentorList={setMentorList}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
