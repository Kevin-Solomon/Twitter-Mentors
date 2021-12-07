import fetch from "node-fetch";

exports.handler = async function (event, context) {
  const twitterHandle = event.queryStringParameters.username || "itshamhere";
  const config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    },
  };

  const res = await fetch(
    `https://api.twitter.com/2/users/by/username/${twitterHandle}?user.fields=profile_image_url,name`,
    config
  );
  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
