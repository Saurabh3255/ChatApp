import React from "react";
import Header from "./HomeComponent/header";
import { useSelector } from "react-redux";
import { componentKey } from "./userSlice";
function Home() {
  const { userDetails } = useSelector(
    (state: any) => state[componentKey] || {}
  );
  console.log("userDetails", userDetails);

  return (
    <div>
      <Header user={userDetails}></Header>
      {/* Slider Layout  */}

      {/* Chat Area Layout */}
    </div>
  );
}

export default Home;
