import React from "react";
import { useSearchParams } from "react-router-dom";

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <div>
      <select
        className="text-sm px-2 py-3 border rounded shadow font-medium bg-base-200 cursor-pointer"
        onChange={(e) => handleChange(e)}
        value={sortBy}
      >
        {options.map((item) => (
          <option
            value={item.value}
            key={item.value}
            className="cursor-pointer"
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
