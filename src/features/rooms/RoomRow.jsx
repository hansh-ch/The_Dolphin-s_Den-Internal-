import React, { useState } from "react";
import { HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

import RoomForm from "./RoomForm";
import { useDeleteRoom } from "./useDeleteRoom";
import { useAddRoom } from "./useAddRoom";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

export default function RoomRow({ room }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { name, image, maxCapacity, regularPrice, discount, description, id } =
    room;
  //
  const { isDeleting, deleteRoomAPI } = useDeleteRoom();
  const { isAdding, addRoomAPI } = useAddRoom();
  const isDisabled = isDeleting || isAdding;

  function handleDuplicate() {
    addRoomAPI({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  }

  return (
    <>
      <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr_1.2fr] shadow px-2 py-1 border border-accent/20 gap-x-0.5">
        <div className="mx-auto">
          <img
            src={image}
            alt={name}
            className="block rounded w-24 aspect-3/2 object-cover object-center scale-105"
          />
        </div>
        <div className="text-center my-auto">
          <p>{name}</p>
        </div>
        <div className="text-center my-auto">
          <p>{maxCapacity}</p>
        </div>
        <div className="text-center my-auto">
          <p className="font-semibold">{formatCurrency(regularPrice)}</p>
        </div>
        <div className="text-center my-auto">
          {discount ? (
            <p> {formatCurrency(discount)} </p>
          ) : (
            <span>&mdash;</span>
          )}
        </div>
        <div className="flex items-center gap-1 justify-center">
          <button
            className="btn btn-primary font-semibold btn-sm"
            onClick={() => setIsEditModalOpen((show) => !show)}
          >
            {isEditModalOpen ? "Close" : "Edit"}
          </button>
          <button
            className="btn btn-outline font-semibold btn-sm"
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={isDisabled}
          >
            <HiTrash />
          </button>
          <button
            className="btn btn-outline font-semibold btn-sm"
            disabled={isDisabled}
            onClick={() => handleDuplicate()}
          >
            <HiSquare2Stack />
          </button>
        </div>
      </div>
      <div className="w-full">
        {isEditModalOpen && (
          <Modal onClose={() => setIsEditModalOpen(false)}>
            <RoomForm roomToEdit={room} onEdit={setIsEditModalOpen} />
          </Modal>
        )}
      </div>
      {isDeleteModalOpen && (
        <Modal onClose={() => setIsDeleteModalOpen(false)}>
          <ConfirmDelete
            onCancel={() => setIsDeleteModalOpen(false)}
            onConfirm={() => deleteRoomAPI(id)}
            resourceName={name}
          />
        </Modal>
      )}
    </>
  );
}
