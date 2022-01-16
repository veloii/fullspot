import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Message from "../components/Message";

const Callback = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const router = useRouter();
  const [data, setData] = useState<any>(false);
  const [code, setCode] = useState<string>();
  console.log(router.query)

  async function getData() {
    if (!code) return;
    if (data) return;
    return setData(
      await(
        await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: "http://localhost:7536/callback.html",
            client_secret: router.query?.clientSecret?.toString(),
            client_id: router.query?.clientId?.toString(),
          }),
        })
      ).json()
    );
  }

  useEffect(() => {
    if (data) {
      if (!data?.access_token) {
        setData(null);
      } else {
        setCookie("auth", data);
        router.push("/");
      }
    }
  });

  return (
    <Message
      msg="Please paste the code below."
      title="Paste Code"
      content={
        <div>
          <input
            type="text"
            value={code}
            onChange={(click) => setCode(click.target.value)}
            className="pointer-events-auto bg-gray-900 p-1 px-2 rounded-md outline-none focus:outline focus:outline-gray-700 mt-3"
          />
          <button
            onClick={getData}
            className="ml-2 p-1 px-3 bg-gray-900 rounded-md pointer-events-auto focus:outline focus:outline-gray-700"
          >
            Submit
          </button>

          <div className="pt-6">
            <code>
              {data != false &&
                (data?.access_token
                  ? "Success, please wait to be logged in!"
                  : "Wrong code")}
            </code>
          </div>
        </div>
      }
      spotify
    />
  );
};

export default Callback;
