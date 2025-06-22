import React from "react";
import Header from "./HomeComponent/header";
import { useSelector } from "react-redux";
import { componentKey } from "./userSlice";
import SideBar from "./HomeComponent/SideBar";
import ChartArea from "./HomeComponent/Chart";
function Home() {
  const { userDetails } = useSelector((state: any) => state[componentKey]);
  const { selectedChat } = useSelector((state: any) => state[componentKey]);
  return (
    <div className="h-screen flex flex-col">
      <Header user={userDetails}></Header>
      {/* Slider Layout  */}

      <div className="flex flex-1">
        {" "}
        <SideBar currentUserId={userDetails?._id} />
        {selectedChat && <ChartArea />}
      </div>

      {/* Chat Area Layout */}
    </div>
  );
}

export default Home;
