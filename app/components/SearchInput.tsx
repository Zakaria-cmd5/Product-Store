"use client";

import { useSearchStore } from "@/providers/SearchStoreProvider";
import { useRef } from "react";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);

  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (ref.current) setSearchTerm(ref.current.value);
      }}
      className="w-full"
    >
      <input
        type="text"
        ref={ref}
        placeholder="Search by name"
        className="p-3 border border-gray-300 rounded-full w-[100%] shadow-sm focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
      />
    </form>
  );
};

export default SearchInput;
