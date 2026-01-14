import { useState } from "react";
import RoomsTable from "../features/rooms/RoomsTable";
import RoomForm from "../features/rooms/RoomForm";
import Modal from "../ui/Modal";
import Filter from "../ui/Filter";
import SortBy from "../ui/SortBy";

export default function Rooms() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">All Rooms</h1>
        <div className="px-2 flex gap-1">
          <Filter
            filterField="discount"
            options={[
              { value: "all", label: "All" },
              { value: "no-discount", label: "No discount" },
              { value: "with-discount", label: "With discount" },
            ]}
          />

          <SortBy
            options={[
              { value: "name-asc", label: "Sort by name (A-Z)" },
              { value: "name-desc", label: "Sort by name (Z-A)" },
              { value: "regularPrice-asc", label: "Sort by price(low-high)" },
              { value: "regularPrice-desc", label: "Sort by price(high-low)" },
              { value: "maxCapacity-asc", label: "Sort by capacity(low-high)" },
              {
                value: "maxCapacity-desc",
                label: "Sort by capacity(high-low)",
              },
            ]}
          />
        </div>
      </div>
      <div>
        <RoomsTable />
        <button
          className="btn btn-primary w-full mt-6 "
          onClick={() => setIsModalOpen((show) => !show)}
        >
          {isModalOpen ? "Close form" : "Add new room"}
        </button>

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <RoomForm onAddCloseModal={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </div>
    </>
  );
}
