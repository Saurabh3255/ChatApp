import React, { useState, useEffect, type ChangeEvent } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetails } from "../UserSaga";
import { componentKey, setSelectedChat } from "../userSlice";
import { componentKey as chatComponentKey } from "./ChartSlice";
import { startNewChartPost } from "./ChartsSaga";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  lastSeen?: string;
  isOnline?: boolean;
}

interface UserSearchListProps {
  currentUserId?: string;
  onSelectUser?: (user: User) => void;
  onMessageClick?: (user: User) => void;
}

const SideBar: React.FC<UserSearchListProps> = ({
  currentUserId,
  onSelectUser,
  onMessageClick,
}) => {
  const dispatch = useDispatch();
  const { alluserDetails } = useSelector((state: any) => state[componentKey]);
  const { allchartDetails } = useSelector(
    (state: any) => state[chatComponentKey]
  );
  console.log("currentUserId", currentUserId);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (alluserDetails?.data) {
      setIsLoading(false);
      const filterUsers = () => {
        // If no search term, show all users
        if (!searchTerm.trim()) {
          return alluserDetails.data;
        }

        // Filter by search term
        return alluserDetails.data.filter((user: User) => {
          const searchLower = searchTerm.toLowerCase();
          return (
            user.firstName.toLowerCase().includes(searchLower) ||
            user.lastName.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower)
          );
        });
      };

      setFilteredUsers(filterUsers());
    }
  }, [searchTerm, alluserDetails]);

  const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const isUserInChat = (userId: string) => {
    return allchartDetails?.find((chat: any) =>
      chat?.members?.some((m: any) => m._id === userId)
    );
  };
  // Users to display - combines search results and chat members
  const usersToDisplay = filteredUsers.filter((user) => {
    if (isUserInChat(user._id)) return true;
    if (searchTerm) return true;
    return true;
  });

  const handleStartChart = async (selectedUserId: string) => {
    try {
      if (!currentUserId) {
        console.error("No current user ID provided");
        return;
      }
      // Dispatch action to start chat
      dispatch(startNewChartPost([currentUserId, selectedUserId]));
    } catch (error) {
      console.log("Error starting chat:", error);
    }
  };

  function openChat(selectedUserId: string) {
    const chat = allchartDetails?.find(
      (chat: any) =>
        chat?.members?.some((member: any) => member._id === currentUserId) &&
        chat?.members?.some((member: any) => member._id === selectedUserId)
    );
    if (chat) {
      dispatch(setSelectedChat(chat));
    }
  }
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
      {/* Search Bar */}
      <div className="p-4 bg-white">
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
      {/* User List */}
      <div className="divide-y divide-gray-200 max-h-[calc(100vh-130px)] overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">Loading users...</div>
        ) : usersToDisplay.length > 0 ? (
          usersToDisplay.map((user) => (
            <div
              onClick={() => openChat(user._id)}
              key={user._id}
              className={`flex items-center p-4 hover:bg-gray-100 cursor-pointer transition-colors ${
                user._id === currentUserId ? "bg-blue-50" : ""
              }`}
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

              {!isUserInChat(user._id) && user._id !== currentUserId && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartChart(user._id);
                  }}
                  className="ml-4 px-3 py-1 text-sm bg-blue-100 text-blue-600 hover:bg-blue-200 rounded"
                >
                  Message
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            {searchTerm ? "No users found" : "No users available"}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
