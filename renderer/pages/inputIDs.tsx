import React from "react";
import Message from "../components/Message";
import { useRouter } from "next/router";

const InputIDs = () => {
  const [id, setId] = React.useState("");
  const [secret, setSecret] = React.useState("");
  const router = useRouter();

  return (
    <div>
      <Message
        title="Authenticate with Spotify"
        msg="Paste the requested fields below."
        content={
          <>
            <button
              className="p-1 px-2 bg-gray-900 rounded-md pointer-events-auto hover:bg-gray-700 mb-3"
              onClick={() =>
                global.ipcRenderer.send(
                  "start_browser",
                  "https://gist.github.com/ZelrDev/6f5dd4cdd06442edb8e86e1c9a0f7952"
                )
              }
            >
              How do I get the IDs?
            </button>
            <div className="flex gap-4 justify-center items-center">
              <input
                type="text"
                value={id}
                placeholder="Client ID"
                onChange={(click) => setId(click.target.value)}
                className="pointer-events-auto bg-gray-900 p-1 px-2 rounded-md outline-none focus:outline focus:outline-gray-700 mt-3"
              />

              <input
                type="text"
                placeholder="Client Secret"
                value={secret}
                onChange={(click) => setSecret(click.target.value)}
                className="pointer-events-auto bg-gray-900 p-1 px-2 rounded-md outline-none focus:outline focus:outline-gray-700 mt-3"
              />
            </div>
            <button
              onClick={() => {
                global.ipcRenderer.send(
                  "start_browser",
                  "http://localhost:7536/login.html?clientId=" + id
                );
                router.push({
                  pathname: "/manualcallback",
                  query: {
                    clientId: id,
                    clientSecret: secret,
                  },
                });
              }}
              className="p-2 px-4 bg-gray-900 hover:bg-gray-700 rounded-md pointer-events-auto mt-10"
            >
              Continue
            </button>{" "}
          </>
        }
      />
    </div>
  );
};

export default InputIDs;
