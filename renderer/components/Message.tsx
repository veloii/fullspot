const Message = (props: {
  msg: string;
  title: string;
  spotify?: boolean;
  classes?: string;
  onClickButton?: any;
  content?: any;
}) => (
  <div
    className={`-z-1 mt-5 text-white w-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ${props.classes}`}
  >
    <div>
      <div className="text-center bg-gray-800 p-10 shadow-xl">
        {props.spotify && (
          <img className="w-8 mx-auto pb-5" src="/spotify.png" />
        )}
        <h1 className="text-4xl font-semibold">{props.title}</h1>
        <p className="max-w-sm mx-auto py-2">{props.msg}</p>
        {props.onClickButton && (
          <button
            onClick={props.onClickButton}
            className="bg-gray-900 p-1 pointer-events-auto px-3 rounded-md"
          >
            <code>Copy code</code>
          </button>
        )}
        {props?.content}
      </div>
    </div>
  </div>
);

export default Message;
