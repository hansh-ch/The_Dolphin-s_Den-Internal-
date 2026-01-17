import React from "react";
import { useSearchParams } from "react-router-dom";

export default function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField);

  function handleClick(value) {
    searchParams.set(filterField, value);
    // resetting page to 1 if filter is applied
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }
  return (
    <div className="bg-base-300  rounded-md shadow p-1 flex gap-1">
      {options.map((option) => (
        <button
          className={`px-3 py-1 bg-none border-none rounded-sm font-medium hover:bg-info duration-200 transition-all cursor-pointer disabled:cursor-not-allowed ${
            currentFilter === option.value ? "bg-info" : ""
          }`}
          onClick={() => handleClick(option.value)}
          key={option.value}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
