import axios from 'axios'

exports.handler = async function (event, context) {
  var config = {
    method: "get",
    url: "https://api.twitter.com/2/users/by/username/itshamhere?user.fields=profile_image_url,name",
    headers: {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      Cookie: `guest_id=${process.env.GUEST_ID}; guest_id_ads=${process.env.GUEST_ID_ADS}; guest_id_marketing=${process.env.GUEST_ID_MARKETING}; personalization_id=${process.env.PERSONALIZATION_ID}`,
    },
  };
  return axios(config)
    .then((response) => ({
      statusCode: 200,
      body: JSON.stringify(response.data),
    }))
    .catch(function (error) {
      console.error(error);
    });
  // return {
  //     statusCode: 200,
  //     body: JSON.stringify({message: "Serverless Function works!"})
  // }
};
