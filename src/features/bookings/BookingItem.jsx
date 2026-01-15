import { useNavigate } from "react-router-dom";
import { format, isToday } from "date-fns";
import { HiEllipsisVertical, HiEye } from "react-icons/hi2";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";

export default function BookingItem({ booking }) {
  const navigate = useNavigate();
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
        <div className="dropdown dropdown-left dropdown-center">
          <div tabIndex={0} role="button" className="btn m-1">
            <HiEllipsisVertical size={24} />
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-neutral rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <button
                className="flex gap-1 cursor-pointer"
                onClick={() => navigate(`/bookings/${bookingId}`)}
              >
                <HiEye /> <span>See details</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
}
