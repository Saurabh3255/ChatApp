import React, { useState, type ChangeEvent, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (searchTerm: string) => void;
  debounceDelay?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  className = "",
  onSearch,
  debounceDelay = 300,
}) => {
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    const timedelay = setTimeout(() => {
      if (onSearch) {
        setSearchValue(searchValue);
      }
    }, debounceDelay);

    return () => clearTimeout(timedelay);
  }, [searchValue, debounceDelay, onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="search"
        value={searchValue}
        onChange={handleChange}
        placeholder={placeholder}
        className=" mt-2 block w-[450px] pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none  sm:text-sm"
      />
    </div>
  );
};

export default SearchBar;
