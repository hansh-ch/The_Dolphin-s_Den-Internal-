import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constant";

export function useGetBookings() {
  const queryClient = useQueryClient();
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

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (pageNo < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortByKeyword, pageNo + 1],
      queryFn: () => getBookings({ filter, sortBy, pageNo: pageNo + 1 }),
    });
  }
  if (pageNo > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortByKeyword, pageNo - 1],
      queryFn: () => getBookings({ filter, sortBy, pageNo: pageNo - 1 }),
    });
  }

  return { bookingsData, isGettingBookings, count };
}
