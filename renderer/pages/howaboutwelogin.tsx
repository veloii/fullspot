import { useRouter } from "next/router";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();

  return (
    <div className="text-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <div>
        <div className="text-center bg-gray-800 p-10 rounded-3xl shadow-xl">
          <img className="w-8 mx-auto pb-5" src="/spotify.png" />
          <h1 className="text-4xl font-semibold">Logging into Spotify</h1>
          <p className="max-w-sm mx-auto py-2">
            To access what you are currently listening to we need you to
            authorize this app.
          </p>

          <button
            onClick={() => {
              router.push("/inputIDs");
            }}
            className="p-2 bg-green-800 rounded-full px-4 hover:bg-green-700 shadow-lg mt-5 transition duration-500 pointer-events-auto"
          >
            Authorize with Spotify
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
