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

  // PAGINATION
  const pageNo = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const {
    isPending: isGettingBookings,
    isError,
    data,
  } = useQuery({
    queryKey: ["bookings", filterValue, sortByKeyword, pageNo],

    queryFn: () => getBookings({ filter, sortBy, pageNo }),
  });

  const { data: bookingsData, count } = data || {};

  return { bookingsData, isGettingBookings, count };
}
