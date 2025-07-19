import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { componentKey } from "../userSlice";
import { componentKey as chartComponentKey } from "./ChartSlice";
import { getAllMessage, sendMessagePost } from "./ChartsSaga";
import Button from "../../../assets/commonComponent/Button";
import moment from "moment";

const ChartArea = () => {
  const dispatch = useDispatch();
  const { selectedChat, userDetails } = useSelector(
    (state: any) => state[componentKey]
  );

  const { allMessage } = useSelector((state: any) => state[chartComponentKey]);
  console.log("All Messages:", allMessage);

  const selectedUser = selectedChat?.members?.find(
    (u: any) => u._id !== userDetails?._id
  );
  const [messages, setMessages] = React.useState("");

  const handleAllMessages = () => {
    dispatch(getAllMessage(selectedChat?._id));
  };

  useEffect(() => {
    if (selectedChat) {
      handleAllMessages();
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    try {
      const message = {
        chatId: selectedChat?._id,
        sender: userDetails?._id,
        text: messages,
      };
      dispatch(sendMessagePost(message));
      setMessages("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const formatTime = (time: any) => {
    const now = moment();
    const diff = now.diff(moment(time), "days");
    if (diff < 1) {
      return moment(time).format("hh:mm A");
    } else if (diff === 1) {
      return "Yesterday";
    } else {
      return moment(time).format("MMM D, hh:mm A");
    }
  };
  return (
    <div className="flex flex-col h-[calc(100vh-52px)] w-full p-5 bg-gray-100 rounded-lg shadow">
      {selectedChat ? (
        <>
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-3 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {selectedUser?.firstName} {selectedUser?.lastName}
            </h2>
            <span className="text-sm text-gray-500">Online</span>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-white rounded-md shadow-inner">
            {allMessage !== null && (
              <div className="flex flex-col gap-3">
                {allMessage?.map((message: any, index: number) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg max-w-[70%] ${
                      message.sender === userDetails?._id
                        ? "bg-blue-500 text-white self-end ml-[100px] rounded-tl-[10px] rounded-tr-[0px]"
                        : "bg-gray-200 text-gray-800 self-start mr-[100px] rounded-bl-[0px]"
                    }`}
                  >
                    <p>{message?.text}</p>
                    <span
                      className={`text-xs text-gray-400 block mt-1 text-right ${
                        message.sender === userDetails?._id
                          ? "bg-blue-500 text-white self-end"
                          : "bg-gray-200 text-gray-800 self-start"
                      }`}
                    >
                      {formatTime(message?.createdAt)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Message Input Area */}
          <div className="mt-4 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={messages}
              onChange={(e) => {
                setMessages(e.target.value);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </>
      ) : (
        <div className="text-gray-500 text-center mt-10">
          Select a chat to start messaging.
        </div>
      )}
    </div>
  );
};

export default ChartArea;
