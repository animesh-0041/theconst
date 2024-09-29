import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import socket from "../../../config/socket";
import { IoMdAttach } from "react-icons/io";
import { CheckBoxTogggel } from "../../../components/CheckBoxTogggel/CheckBoxTogggel";
import { ChatTextArea } from "../../../components/ChatTextArea/ChatTextArea";

export const MessageLayout = (props) => {
  const {
    children,
    userData,
    message,
    handleSend,
    selectedChat,
    setSelectedChat,
    handleTypeMessage,
  } = props;
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [isTyping, setIsTyping] = useState(false);


  // listen for online users
  // useEffect(() => {
  //   socket.on("online-users", (users) => {
  //     setOnlineUsers(new Set(users));
  //   });

  //   return () => {
  //     socket.off("online-users");
  //   };
  // }, []);

  useEffect(() => {
    socket.on("online-users", (users) => {
      setOnlineUsers(new Set(users));
    });

    socket.on("typing", ({ typingUsers }) => {
      console.log(typingUsers, 'isTyping')
      setIsTyping(typingUsers.includes(userData?._id));
    });

    return () => {
      socket.off("online-users");
      socket.off("typing");
    };
  }, [userData?._id]);

  useEffect(() => {
    setIsTyping(false);
  }, [userData?._id]);


  console.log(isTyping, 'isTyping', userData?._id)


  return (
    <div className="w-full px-4 pt-1 h-full flex flex-col gap-0 justify-between">
      {/* nav bar */}
      <nav className="w-full flex flex-row justify-between items-center py-2 border-b border-black-200">
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

        {!!Object.keys(selectedChat)?.length &&
          <span
            onClick={() => setSelectedChat({})}
            className="text-xs font-Golos text-black-500 font-normal cursor-pointer capitalize"
          >
            {Object.keys(selectedChat)?.length} selected
          </span>
        }
      </nav>

      <div
        id="hide_scrollbar"
        className="w-full h-[calc(100vh-108px)] box-border"
      >
        {children}
      </div>

      <ChatTextArea
        value={message}
        handleSend={handleSend}
        handleTypeMessage={handleTypeMessage}
      />
    </div>
  );
};
