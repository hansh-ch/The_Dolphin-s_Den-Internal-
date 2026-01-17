import { useEffect, useState } from "react";
import { useGetBookingById } from "../bookings/useGetBookingById";
import Loader from "../../ui/Loader";
import BookingDataBox from "../bookings/BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useCheckin } from "./useCheckin";

export default function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, isPending } = useGetBookingById();
  const { checkinBooking, isCheckingIn } = useCheckin();
  const navigateBack = useMoveBack();
  const isPaid = booking?.isPaid ?? false;

  useEffect(() => {
    setConfirmPaid(isPaid);
  }, [isPaid]);

  function handleCheckin() {
    if (!confirmPaid) return;
    checkinBooking(bookingId);
  }

  if (isPending) return <Loader />;
  const { id: bookingId, guests } = booking;
  return (
    <div>
      <article className="flex justify-between items-center p-2">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-semibold">
            Check in booking #<span>{bookingId}</span>
          </h3>
        </div>
        <button
          className="btn btn-ghost btn-sm flex items-center"
          onClick={navigateBack}
        >
          &larr; Back
        </button>
      </article>
      <BookingDataBox booking={booking} />
      {/*  */}
      <div className="space-y-3 mt-6 p-2">
        <ul className="px-4 py-2">
          <li className="flex items-center gap-4">
            <input
              type="checkbox"
              id="paidCheckbox"
              checked={confirmPaid}
              onChange={() => setConfirmPaid((p) => !p)}
              className="checkbox "
              disabled={confirmPaid || isCheckingIn}
            />
            <span>
              I confirm that {guests.fullName} has paid the total amount{" "}
            </span>
          </li>
        </ul>
      </div>

      <div className="flex justify-end gap-2 items-center mt-5">
        <button
          className="btn btn-primary "
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingIn}
        >
          Checkin booking
        </button>
        <button className="btn btn-accent" onClick={navigateBack}>
          Back
        </button>
      </div>
    </div>
  );
}
