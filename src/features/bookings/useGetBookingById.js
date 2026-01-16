import { useQuery } from "@tanstack/react-query";
import { getBookingById } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useGetBookingById() {
  const { bookingId } = useParams();
  const { data: booking, isPending } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBookingById(bookingId),
    retry: false,
  });
  return { booking, isPending };
}
