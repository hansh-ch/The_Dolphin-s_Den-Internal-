import { useGetBookings } from "../features/bookings/useGetBookings";
import Loader from "../ui/Loader";
import BookingsTable from "../features/bookings/BookingsTable";
import BookingItem from "../features/bookings/BookingItem";
import BookingTableHeader from "../features/bookings/BookingTableHeader";
import BookingSortFilter from "../features/bookings/BookingSortFilter";

export default function Bookings() {
  const { bookingsData, isGettingBookings } = useGetBookings();

  if (isGettingBookings) return <Loader />;
  return (
    <div className="mt-4 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">All Bookings</h1>
        <BookingSortFilter />
      </div>
      <BookingTableHeader />
      <section className="mt-6">
        <BookingsTable
          data={bookingsData}
          render={(booking) => (
            <BookingItem booking={booking} key={booking.id} />
          )}
        />
      </section>
    </div>
  );
}
