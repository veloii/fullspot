import { useRouter } from "next/router";
import { useEffect } from "react";
import Message from "../components/Message";

function makeid(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const Login = () => {
  const router = useRouter();

  const state = makeid(16);

  useEffect(() => {
    console.log(router.query);
    if (router.query?.clientId) {
      router.push(
        "https://accounts.spotify.com/authorize?" +
          new URLSearchParams({
            response_type: "code",
            client_id: router.query?.clientId?.toString(),

            scope: "user-read-currently-playing ",
            redirect_uri: "http://localhost:7536/callback.html",
            state: state,
          })
      );
      return () => {};
    }
  });

  return (
    <Message
      title="Logging into Spotify"
      msg="Redirecting you to spotify login"
      spotify
    />
  );
};

export default Login;
