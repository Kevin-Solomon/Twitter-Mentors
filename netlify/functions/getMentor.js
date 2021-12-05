import axios from "axios";
// import fetch from 'node-fetch'

exports.handler = async function (event, context) {
  // const POKEDEX_API = "https://pokeapi.co/api/v2/pokedex/kanto"

  // const response = await fetch(POKEDEX_API)
  // const data = await response.json()

  // return {
  //     statusCode: 200,
  //     body: JSON.stringify({data : data, message: "Done"})
  // }
  var config = {
    method: "GET",
    url: "https://api.twitter.com/2/users/by/username/itshamhere?user.fields=profile_image_url,name",
    headers: {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      Cookie: `guest_id=${process.env.GUEST_ID}; guest_id_ads=${process.env.GUEST_ID_ADS}; guest_id_marketing=${process.env.GUEST_ID_MARKETING}; personalization_id=${process.env.PERSONALIZATION_ID}`,
    },
  };
  return axios(config)
    .then(function (response) {
      console.log("Hello");
    })
    .catch(function (error) {
      console.error(error);
    });
  // return {
  //     statusCode: 200,
  //     body: JSON.stringify({message: "Serverless Function works!"})
  // }
};
