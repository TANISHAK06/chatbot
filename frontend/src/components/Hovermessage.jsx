const Hovermessage = (props) => {
  return (
    <>
      <div
        className={`absolute right-0 top-20 max-w-xs transition-all duration-300 ease-in-out ${
          props.showMessage
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <div className="bg-white rounded-l-lg shadow-lg overflow-hidden border-l-4 border-indigo-500 p-4 m-4">
          <p className="text-gray-700">
            <span className="font-medium text-indigo-700">Hey there!</span> This
            is your go-to help for any kind of query. I look alone but with me
            there is Financial AI Agent 💰, Admission AI Agent 🎓 and User
            Detail AI Agent 👤
          </p>
        </div>
      </div>
    </>
  );
};
export default Hovermessage;
