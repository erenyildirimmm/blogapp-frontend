import React from "react";
import Input from "../ui/Input";
import { CiSearch } from "react-icons/ci";

const PostFilters = ({ search, onSearchChange }) => {
  return (
    <div className="flex items-center justify-between mb-12 relative">
      <div className="relative">
        <div>
        <CiSearch size={30} className="absolute bottom-3 right-3" />
        </div>
        <Input value={search} className="text-xl" onChange={onSearchChange} />
      </div>
    </div>
  );
};

export default PostFilters;
