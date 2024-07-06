import React from "react";
import Input from "../ui/Input";
import { CiSearch } from "react-icons/ci";
import { usePost } from "../provider/postProvider";

const PostFilters = () => {
  const { setSearch, search } = usePost();
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="relative mb-12">
        <div className="bg-gray-900 absolute top-0 left-0 rounded-tl-md rounded-bl-md h-full border py-1 px-2 flex items-center justify-center">
          <CiSearch size={25} className="text-white" />
        </div>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Ara..."
          className="sm:w-1/3 w-full pl-12 py-2 border outline-none rounded-md text-gray-900"
        />
    </div>
  );
};

export default PostFilters;
