import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import socket from "../../../config/socket";

export const MessageLayout = ({
  children,
  userData,
  message,
  handleSend,
  handleTypeMessage,
}) => {
  const [onlineUsers, setOnlineUsers] = useState(new Set());

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  // listen for online users
  useEffect(() => {
    socket.on("online-users", (users) => {
      setOnlineUsers(new Set(users));
      console.log(new Set(users));
    });

    return () => {
      socket.off("online-users");
    };
  }, []);

  return (
    <div className="w-full px-4 pt-2 h-content flex flex-col gap-0 justify-between">
      {/* nav bar */}
      <nav className="w-full flex flex-row justify-between py-2 border-b border-black-200">
        <div className="flex flex-row items-center gap-4">
          <img
            className="block w-9 h-9 rounded-full"
            src={
              userData?.photoURL ||
              "https://cdn-icons-png.flaticon.com/128/1999/1999625.png"
            }
            onError={(e) =>
              (e.target.src =
                "https://cdn-icons-png.flaticon.com/128/1999/1999625.png")
            }
          />
          <div className="flex flex-col gap-0">
            <h1 className="font-Golos font-normal leading-5 text-xs capitalize text-black-700">
              {userData?.name || "---"}
            </h1>
            <p className="font-Golos font-normal leading-3 text-[10px] text-green-300">
              {onlineUsers.has(userData?._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </nav>
      <div
        id="hide_scrollbar"
        className="w-full h-[calc(100vh-180px)] box-border"
      >
        {children}
      </div>
      {/* text area  */}
      <div className="w-full relative py-2">
        <input
          type="text"
          value={message}
          onKeyPress={handleKeyPress}
          onChange={handleTypeMessage}
          placeholder="Write a message..."
          className="w-full px-4 py-3 border border-black-50 outline-none rounded font-Golos text-xs text-black-700 bg-white"
        />
        <button
          onClick={() => handleSend()}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 rounded-full bg-orange-400 px-3 py-1 font-Golos font-normal text-sm active:bg-orange-500 text-white"
        >
          <IoSend size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
};
