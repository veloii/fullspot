const refreshToken = async (refresh_token: string) => {
  const data = await (
    await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          new Buffer(
            process.env.NEXT_PUBLIC_CLIENT_ID +
              ":" +
              process.env.NEXT_PUBLIC_CLIENT_SECRET
          ).toString("base64"),
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
      },

      body: new URLSearchParams({
        grant_type: "refresh_token",

        refresh_token: refresh_token,
      }),
    })
  ).json();

  if (data?.error === "invalid_client") {
    console.log("The token is incorrect, please reauthenticate.");
    return false;
  }
  if (data?.error) {
    return null;
  }

  return data;
};

export default refreshToken;
