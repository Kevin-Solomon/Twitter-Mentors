import fetch from "node-fetch";

exports.handler = async function (event, context) {
  var config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      Cookie: `guest_id=${process.env.GUEST_ID}; guest_id_ads=${process.env.GUEST_ID_ADS}; guest_id_marketing=${process.env.GUEST_ID_MARKETING}; personalization_id=${process.env.PERSONALIZATION_ID}`,
    },
  };

  const res = await fetch(
    "https://api.twitter.com/2/users/by/username/tanaypratap?user.fields=profile_image_url,name",
    config
  );
  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
