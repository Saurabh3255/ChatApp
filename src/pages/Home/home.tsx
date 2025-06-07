import React from "react";
import Header from "./HomeComponent/header";
import { useSelector } from "react-redux";
import { componentKey } from "./userSlice";
import SideBar from "./HomeComponent/SideBar";
function Home() {
  const { userDetails } = useSelector((state: any) => state[componentKey]);
  console.log("userDetails", userDetails);

  return (
    <div>
      <Header user={userDetails}></Header>
      {/* Slider Layout  */}
      <SideBar
        onSelectUser={function (user: User): void {
          throw new Error("Function not implemented.");
        }}
      />
      {/* Chat Area Layout */}
    </div>
  );
}

export default Home;
