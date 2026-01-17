import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format, isToday } from "date-fns";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEllipsisVertical,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import { useOutsideClick } from "../../hooks/useOutside";

export default function BookingItem({ booking }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { checkoutBooking, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const navigate = useNavigate();
  const ref = useOutsideClick(() => setIsDropdownOpen(false));
  const {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    roomPrice,
    extrasPrice,
    totalPrice,
    status,
    guests: { fullName, email },
    rooms: { name: roomName },
  } = booking;

  let statusStyle = {
    unconfirmed: "bg-info",
    "checked-out": "bg-warning/50 ",
    "checked-in": "bg-success",
  };
  function handleCheckout() {
    checkoutBooking(bookingId);
  }

  return (
    <li className="w-full grid grid-cols-[0.6fr_2fr_2.4fr_1.4fr_1fr_3.6rem] gap-6 items-center py-6 px-3 border-b border-b-accent-content text-center">
      <div className="font-semibold font-[sono]">{roomName}</div>
      <div className="flex  flex-col gap-0.5]">
        <span className="font-medium">{fullName}</span>
        <span className="text-[12px]">{email}</span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[12px]">
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span className="text-[12px]">
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </div>
      <div className="">
        <span
          className={`text-sm rounded-full w-fit font-semibold px-2 py-2 ${statusStyle[status]}`}
        >
          {status}
        </span>
      </div>
      <div className="font-[sono] font-semibold">
        {formatCurrency(totalPrice)}
      </div>
      <div className="flex items-center">
        <div
          ref={ref}
          className={`dropdown dropdown-left dropdown-center ${
            isDropdownOpen ? "dropdown-open" : "dropdown-close"
          }`}
        >
          <button
            className="btn m-1"
            onClick={() => setIsDropdownOpen((p) => !p)}
          >
            <HiEllipsisVertical size={24} />
          </button>
          <ul className="dropdown-content menu bg-neutral rounded-box z-1 w-52 p-2 shadow-sm">
            <li>
              <button
                className="flex gap-1 cursor-pointer"
                onClick={() => navigate(`/bookings/${bookingId}`)}
              >
                <HiEye /> <span>See details</span>
              </button>
            </li>

            {status === "unconfirmed" && (
              <li>
                <button
                  className="flex gap-1 cursor-pointer disabled:opacity-90"
                  onClick={() => navigate(`/checkin/${bookingId}`)}
                >
                  <HiArrowDownOnSquare /> <span>Checkin</span>
                </button>
              </li>
            )}
            {status === "checked-in" && (
              <li>
                <button
                  className="flex gap-1 cursor-pointer disabled:opacity-75"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  <HiArrowUpOnSquare />
                  <span>Checkout</span>
                </button>
              </li>
            )}
            <li>
              <button
                className="flex gap-1 cursor-pointer disabled:opacity-75"
                onClick={() => {
                  setIsDeleteModalOpen(true);
                  setIsDropdownOpen(false);
                }}
              >
                <HiTrash />
                <span>Delete</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {isDeleteModalOpen && (
        <Modal onClose={() => setIsDeleteModalOpen(false)}>
          <ConfirmDelete
            onCancel={() => setIsDeleteModalOpen(false)}
            onConfirm={() => deleteBooking(bookingId)}
            resourceName="this booking"
          />
        </Modal>
      )}
    </li>
  );
}
