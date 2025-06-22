import React, { useState, useEffect, type ChangeEvent } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetails } from "../UserSaga";
import { componentKey } from "../userSlice";
import { componentKey as chatComponentKey } from "./ChartSlice";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  lastSeen?: string;
  isOnline?: boolean;
}

interface UserSearchListProps {
  currentUserId?: string;
  onSelectUser: (user: User) => void;
  onMessageClick?: (user: User) => void;
}

const UserSearchList: React.FC<UserSearchListProps> = ({
  currentUserId,
  onSelectUser,
  onMessageClick,
}) => {
  const dispatch = useDispatch();
  const { alluserDetails } = useSelector((state: any) => state[componentKey]);
  console.log("alluserDetails", alluserDetails);
  const getUser = localStorage.getItem("user");
  const currentUser = getUser?._id;
  console.log("currentUser", currentUser);

  const { allchartDetails } = useSelector(
    (state: any) => state[chatComponentKey]
  );
  console.log("alluserDetails", allchartDetails);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  // Fetch users on mount
  useEffect(() => {
    dispatch(getAllUserDetails());
  }, [dispatch]);

  // Filter users when search term or user data changes
  useEffect(() => {
    if (alluserDetails?.data) {
      if (searchTerm.trim() === "") {
        setFilteredUsers(alluserDetails.data);
      } else {
        const filtered = alluserDetails.data.filter((user: User) =>
          `${user.firstName} ${user.lastName} ${user.email}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
      }
    }
  }, [searchTerm, alluserDetails]);

  const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
      {/* Search Bar */}
      <div className="p-4 bg-white border-b">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none sm:text-sm"
          />
        </div>
      </div>

      {/* User List */}
      <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
        {filteredUsers?.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`flex items-center p-4 hover:bg-gray-100 cursor-pointer transition-colors ${
                user.id === currentUserId ? "bg-blue-50" : ""
              }`}
              onClick={() => onSelectUser(user)}
            >
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full shadow">
                  <span className="font-medium text-white">
                    {getInitials(user.firstName, user.lastName)}
                  </span>
                </div>
                {user.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>

              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </h3>
                  {user.lastSeen && (
                    <span className="text-xs text-gray-500">
                      {user.isOnline ? "Online" : `Last seen ${user.lastSeen}`}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>
              {/* {all&&()} */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMessageClick?.(user);
                }}
                className="ml-4 px-3 py-1 text-sm bg-blue-100 text-blue-600 hover:bg-blue-200 rounded"
              >
                Message
              </button>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            {searchTerm ? "No users found" : "Loading users..."}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSearchList;
