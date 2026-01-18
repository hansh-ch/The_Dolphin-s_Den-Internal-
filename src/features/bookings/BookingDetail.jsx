import React, { useState } from "react";

import { statusStyle } from "../../utils/constant";
import { useGetBookingById } from "./useGetBookingById";
import Loader from "../../ui/Loader";
import { HiOutlineCurrencyDollar, HiOutlineHomeModern } from "react-icons/hi2";

import { useMoveBack } from "../../hooks/useMoveBack";
import BookingDataBox from "./BookingDataBox";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";

import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import { useNavigate } from "react-router-dom";

export default function BookingDetail() {
  const { booking, isPending } = useGetBookingById();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { checkoutBooking, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const navigateBack = useMoveBack();
  const navigate = useNavigate();

  //Handling delete logic
  function handleConfirmDelete() {
    deleteBooking(bookingId, {
      onSettled: () => {
        navigate("/bookings");
      },
    });
  }

  if (isPending) return <Loader />;
  const { id: bookingId, status } = booking;

  return (
    <div className="overflow-hidden px-4 py-2">
      <article className="flex justify-between items-center p-2">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-semibold">
            Booking #<span>{bookingId}</span>
          </h3>
          <span
            className={`text-sm rounded-full w-fit font-semibold px-2 py-1 ${statusStyle[status]}`}
          >
            {status}
          </span>
        </div>
        <button
          className="btn btn-ghost btn-sm flex items-center"
          onClick={navigateBack}
        >
          &larr; Back
        </button>
      </article>

      <BookingDataBox booking={booking} />

      <div className="flex justify-end items-center gap-5 mt-6">
        <button
          className="btn btn-error "
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete
        </button>
        {status === "checked-in" && (
          <button
            className="btn btn-primary "
            onClick={() => checkoutBooking(bookingId)}
            disabled={isCheckingOut}
          >
            Checkout
          </button>
        )}
        <button className="btn btn-accent" onClick={navigateBack}>
          Back
        </button>
      </div>

      {isDeleteModalOpen && (
        <Modal onClose={() => setIsDeleteModalOpen(false)}>
          <ConfirmDelete
            onCancel={() => setIsDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            resourceName="this booking"
          />
        </Modal>
      )}
    </div>
  );
}
