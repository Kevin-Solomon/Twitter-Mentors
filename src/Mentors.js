import React from "react";

function fetchMentor() {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer AAAAAAAAAAAAAAAAAAAAACjtWAEAAAAAa1FwPeaT5c2jgcKtxTf%2BaBCDxac%3DGV1ybVBbMfxT8BkG9aDY0V4iTOYcoT3MpUsTvf37Of7dyhtjo0"
  );
  myHeaders.append(
    "Cookie",
    'guest_id=v1%3A163798981035928505; guest_id_ads=v1%3A163798981035928505; guest_id_marketing=v1%3A163798981035928505; personalization_id="v1_j0aP1wbL37FX/9BsALm1hA=="'
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "https://api.twitter.com/2/users/by/username/tanaypratap?user.fields=profile_image_url,name",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

function Mentors() {
  return (
    <div>
      <button onClick={fetchMentor}>Get Mentor</button>
    </div>
  );
}

export default Mentors;

/*
Each mentor section should show the following info:
1. Profile picture
2. Name of Mentor
3. A button, which on click takes the user directly to the mentor profile (in a new tab)
4. A text which could show when they last tweeted?
5. Another text showing a preview of their last tweet?
*/
