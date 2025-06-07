import React, { useState, useRef, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface DropdownButtonProps {
  className?: string;
  buttonContent?: ReactNode;
  onProfileClick?: () => void;
  onSignoutClick?: () => void;
  dropdownAlign?: "left" | "right";
  userData?: {
    firstName?: string;
    lastName?: string;
    username?: string;
    initials?: string;
  };
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  className = "",
  buttonContent,
  onProfileClick,
  onSignoutClick,
  dropdownAlign = "right",
  userData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setIsOpen(false);
    if (onProfileClick) {
      onProfileClick();
    } else {
      navigate("/profile");
    }
  };

  const handleSignoutClick = () => {
    setIsOpen(false);
    if (onSignoutClick) {
      onSignoutClick();
    } else {
      console.log("Signing out..."); // Default behavior if no handler provided
      // Typically you would dispatch a logout action here
    }
  };

  const getInitials = (firstName?: string, lastName?: string): string => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        className={`flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full shadow hover:bg-blue-700 transition-colors ${className}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {buttonContent || (
          <span className="font-medium text-white">
            {getInitials(userData?.firstName, userData?.lastName)}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className={`absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
            dropdownAlign === "right" ? "right-0" : "left-0"
          }`}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={handleProfileClick}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left"
              role="menuitem"
            >
              Profile View
            </button>
            <button
              onClick={handleSignoutClick}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left"
              role="menuitem"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
