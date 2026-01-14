import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useGetBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status") || "all";

  // FILTER
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };

  // Sort
  const sortByKeyword = searchParams.get("sortBy") || "startDate-desc";
  const [sortFieldName, direction] = sortByKeyword.split("-");
  const sortBy = { sortFieldName, direction };

  const {
    isPending: isGettingBookings,
    isError,
    data: bookingsData,
  } = useQuery({
    queryKey: ["bookings", filterValue, sortByKeyword],

    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { bookingsData, isGettingBookings };
}
