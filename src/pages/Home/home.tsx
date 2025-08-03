import React, { useEffect } from "react";
import Header from "./HomeComponent/header";
import { useSelector } from "react-redux";
import { componentKey } from "./userSlice";
import SideBar from "./HomeComponent/SideBar";
import ChartArea from "./HomeComponent/Chart";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
function Home() {
  const { selectedChat, userDetails } = useSelector(
    (state: any) => state[componentKey]
  );

  useEffect(() => {
    if (userDetails?._id) {
      socket.emit("join-room", userDetails?._id);
    }
  }, [userDetails?._id]);

  return (
    <div className="h-screen flex flex-col">
      <Header user={userDetails}></Header>
      {/* Slider Layout  */}

      <div className="flex flex-1">
        {" "}
        <SideBar currentUserId={userDetails?._id} />
        {selectedChat && <ChartArea socket={socket} />}
      </div>

      {/* Chat Area Layout */}
    </div>
  );
}

export default Home;
