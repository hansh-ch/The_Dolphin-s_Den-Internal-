import { useEffect, useState } from "react";
import { useGetBookingById } from "../bookings/useGetBookingById";
import Loader from "../../ui/Loader";
import BookingDataBox from "../bookings/BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useCheckin } from "./useCheckin";
import { useGetSettings } from "../settings/useGetSettings";
import { formatCurrency } from "../../utils/helpers";

export default function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  // hooks that are connected to backend
  const { booking, isPending } = useGetBookingById();
  const { checkinBooking, isCheckingIn } = useCheckin();
  const { settingsData, isFetchingSettings } = useGetSettings();

  const navigateBack = useMoveBack();

  const isPaid = booking?.isPaid ?? false;

  useEffect(() => {
    setConfirmPaid(isPaid);
  }, [isPaid]);

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      const breakfast = {
        hasBreakfast: true,
        extrasPrice: optionalBreakfastPrice,
        totalPrice: totalPrice + optionalBreakfastPrice,
      };
      checkinBooking({ bookingId, breakfast });
    } else {
      checkinBooking({ bookingId, breakfast: {} });
    }
  }

  if (isPending || isFetchingSettings) return <Loader />;
  const {
    id: bookingId,
    guests,
    numNights,
    numGuests,
    hasBreakfast,
    totalPrice,
  } = booking;
  const optionalBreakfastPrice =
    settingsData.breakfastPrice * numNights * numGuests;
  console.log(optionalBreakfastPrice);
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
      {/* Checkin requirements */}
      <div className=" mt-6 p-2">
        <ul className="px-4 py-2 space-y-3">
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
              {!addBreakfast
                ? formatCurrency(totalPrice)
                : `(${formatCurrency(totalPrice)} + ${formatCurrency(
                    optionalBreakfastPrice
                  )})`}
            </span>
          </li>
          {!hasBreakfast && (
            <li className="flex items-center gap-4">
              <input
                type="checkbox"
                id="breakfast"
                checked={addBreakfast}
                onChange={() => {
                  setAddBreakfast((add) => !add);
                  setConfirmPaid(false);
                }}
                className="checkbox "
              />
              <span id="breakfast">
                Want to add breakfast for {guests.fullName}
              </span>
            </li>
          )}
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
