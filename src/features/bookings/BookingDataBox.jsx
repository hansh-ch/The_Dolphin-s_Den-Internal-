import { HiOutlineCurrencyDollar, HiOutlineHomeModern } from "react-icons/hi2";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { statusStyle } from "../../utils/constant";
import { useMoveBack } from "../../hooks/useMoveBack";

export default function BookingDataBox({ booking }) {
  const navigateBack = useMoveBack();
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
    hasBreakfast,
    isPaid,
    observations,
    roomId,
    guestId,
    rooms: { name: roomName },
    guests: { email, fullName, nationality },
  } = booking || {};
  return (
    <div className="overflow-hidden px-4 py-2">
      <section className="mt-4 rounded-md p-2">
        <div className="bg-primary text-primary-content flex justify-between items-center px-5 py-6 mb-5 rounded-t-md">
          <div className="flex items-center gap-1">
            <HiOutlineHomeModern size={32} />
            <p className="text-xl">
              {numNights} nights in Room <span>{roomName}</span>
            </p>
          </div>
          <p>
            {format(new Date(startDate), "EEE, MMM dd yyyy")} (
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}
            ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-semibold">{fullName}</span>
          <li className="text-sm text-base-content/90 font-semibold">
            {email}
          </li>
          <li className="text-sm text-base-content/90 font-semibold">
            {nationality}
          </li>
        </div>
        {observations && (
          <div className="mt-5 flex items-center gap-2">
            <span className="font-semibold">Observations :</span>
            <span className="text-base-content/80">{observations}</span>
          </div>
        )}
        <div className="mt-5 flex items-center gap-2">
          <span className="font-semibold">Breakfast included :</span>
          <span className="text-base-content/80">
            {hasBreakfast ? "Yes" : "No"}
          </span>
        </div>
        <div
          className={`flex items-center justify-between rounded-sm  mt-6 px-4 py-6 ${
            isPaid ? "bg-secondary/50" : "bg-secondary/80"
          }`}
        >
          <p className="flex items-center gap-1">
            <span>
              <HiOutlineCurrencyDollar />
            </span>
            <span>Total Price : </span>
            <span>{formatCurrency(totalPrice)}</span>
            <span>
              {hasBreakfast &&
                ` (${formatCurrency(roomPrice)} room + ${formatCurrency(
                  extrasPrice
                )} breakfast)`}
            </span>
          </p>
          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </div>
        <footer className="text-base-content flex justify-end mt-4">
          <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
        </footer>
      </section>
    </div>
  );
}
