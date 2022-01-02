import React, { useState } from "react";
import { FaTwitter, FaTrash, FaExpandAlt } from "react-icons/fa";

export default function MentorComponent({
  mentor,
  setMentorList,
  handleDelete,
}) {
  const [showTweet, setShowTweet] = useState(false);
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
    setShowTweet(true);
    setLoading(false);
  }
  return (
    <div className="mentor-main">
      <section className="mentor-section">
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
        {mentor.recentTweet && showTweet ? (
          <>
            <a
              href={`https://twitter.com/${mentor.userName}/status/${mentor.recentTweet.id}`}
              target="_blank"
              rel="noreferrer"
              title="View Tweet"
            >
              <p className="mentor-recent-tweet-text">
                {mentor.recentTweet.text}
              </p>
            </a>
            <p className="recent-tweet-click" onClick={() => setShowTweet(false)}>
              <FaExpandAlt /> Hide Tweet
            </p>
          </>
        ) : loading ? (
          <div className="lds-dual-ring-tweet"></div>
        ) : (
          <p className="recent-tweet-click" onClick={() => getRecentTweet(mentor.userId)}>
            <FaExpandAlt /> Show Recent Tweet
          </p>
        )}
      </section>
    </div>
  );
}
