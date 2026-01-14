import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constant";

export default function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function prevPage() {
    const next = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }
  if (pageCount <= 1) return null;
  return (
    <div className="flex justify-between items-center w-full mt-2">
      <p className="text-sm ml-2">
        Showing{" "}
        <span className="font-semibold mx-1">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>
        to
        <span className="font-semibold mx-1">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>
        of
        <span className="font-semibold mx-1">{count}</span> results
      </p>

      <div className="flex gap-1.5 ">
        <button
          className="px-1 py-1.5 rounded text-sm flex items-center justify-center gap-1 transition-all duration-300 text-info cursor-pointer disabled:text-success disabled:cursor-not-allowed disabled:bg-info/20 hover:bg-info/20 "
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <HiChevronLeft />
          <span>Previous</span>
        </button>
        <button
          className="px-1 py-1.5 rounded text-sm flex items-center justify-center gap-1 transition-all duration-300 text-info cursor-pointer disabled:text-success disabled:bg-info/20 disabled:cursor-not-allowed hover:bg-info/20"
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
}
