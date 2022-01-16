import { useRouter } from "next/router";
import Message from "../components/Message";

const Callback = () => {
  const router = useRouter();

  const copy = () => {
    navigator.clipboard.writeText(router.query?.code.toString());

    alert("Copied");
  };

  if (router.query?.code) {
    return (
      <Message
        msg="Please copy the code into the app."
        title="Success"
        onClickButton={copy}
        spotify
      />
    );
  } else {
    return <Message msg="I can't find a code." title="Oops" spotify />;
  }
};

export default Callback;
