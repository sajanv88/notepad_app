import React from "react";
import { FaSearch } from "react-icons/fa";

function Search({ onSearchandler }) {
  return (
    <React.Fragment>
      <div className="flex items-center border-b m-1">
        <input
          type="text"
          placeholder="Search..."
          onChange={onSearchandler}
          className="border-none bg-transparent p-3 w-full text-gray-200 outline-none"
        />
        <FaSearch className="text-3xl text-gray-200" />
      </div>
    </React.Fragment>
  );
}

export default Search;
