import { useGetBookings } from "../features/bookings/useGetBookings";
import Loader from "../ui/Loader";
import BookingsTable from "../features/bookings/BookingsTable";
import BookingItem from "../features/bookings/BookingItem";
import BookingTableHeader from "../features/bookings/BookingTableHeader";
import BookingSortFilter from "../features/bookings/BookingSortFilter";
import Pagination from "../ui/Pagination";
import NodataToShow from "../ui/NodataToShow";

export default function Bookings() {
  const { bookingsData, count, isGettingBookings } = useGetBookings();

  if (isGettingBookings) return <Loader />;
  if (!bookingsData.length) return <NodataToShow resourceName={"bookings"} />;
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
      <footer className="flex justify-center items-center">
        <Pagination count={count} />
      </footer>
    </div>
  );
}
