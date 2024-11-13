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
        className="p-3 border-2 border-gray-300 rounded-full w-full shadow-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400 transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-md"
      />
    </form>
  );
};

export default SearchInput;
