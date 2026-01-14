import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getRooms } from "../../services/apiRooms";
import Loader from "../../ui/Loader";
import RoomRow from "./RoomRow";
import { useSearchParams } from "react-router-dom";
import { useGetRooms } from "./useGetRooms";

export default function RoomsTable() {
  const [searchParams] = useSearchParams();
  const filterKeyword = searchParams.get("discount") || "all";
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [sortKeyword, sortType] = sortBy.split("-");

  const { rooms, isGettingRooms } = useGetRooms();
  if (isGettingRooms) return <Loader />;

  let filteredRooms;
  let sortedRooms;

  // Applying filter
  if (filterKeyword === "all") filteredRooms = rooms;
  if (filterKeyword === "no-discount") {
    filteredRooms = rooms.filter((r) => r.discount === 0);
  }
  if (filterKeyword === "with-discount") {
    filteredRooms = rooms.filter((r) => r.discount > 0);
  }

  // Applying sort
  // 1=means ascending and multiply with -1 means descending
  const sortModifier = sortType === "asc" ? 1 : -1;
  sortedRooms = filteredRooms.sort(
    (a, b) => (a[sortKeyword] - b[sortKeyword]) * sortModifier
  );

  return (
    <div className="mt-4">
      <div className="w-full grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr_1.2fr] border border-accent/25 shadow-sm py-4 px-2 gap-x-0.5">
        <div className="uppercase font-bold text-xl text-center">Image</div>
        <div className="uppercase font-bold text-xl text-center">Room</div>
        <div className="uppercase font-bold text-xl text-center">Capacity</div>
        <div className="uppercase font-bold text-xl text-center">Price</div>
        <div className="uppercase font-bold text-xl text-center">Discount</div>
        <div className="uppercase font-bold text-xl text-center">Actions</div>
      </div>

      <div className="mt-6">
        {sortedRooms?.map((room) => (
          <RoomRow key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}
