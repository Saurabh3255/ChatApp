import React from "react";
import { useNavigate } from "react-router-dom";
import DropdownButton from "../../../commonComponents/DropDownButton";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  initials: string;
}

interface HeaderProps {
  user?: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const navigate = useNavigate();
  const userData = user;

  const handleSignout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between w-full h-16 p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-blue-600"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-tight">ThinkChat</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-right hidden sm:block">
          <p className="font-medium">{`${userData?.firstName} ${userData?.lastName}`}</p>
          <p className="text-xs text-blue-200">@{userData?.email}</p>
        </div>
        <DropdownButton
          userData={user}
          onProfileClick={() => navigate("/profile")}
          onSignoutClick={handleSignout}
          className="ml-4"
        />
      </div>
    </header>
  );
};

export default Header;
