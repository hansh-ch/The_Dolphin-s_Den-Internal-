import { supabase } from "./supabase";

export const getBookings = async ({ filter, sortBy }) => {
  console.log(filter);
  let query = supabase
    .from("bookings")
    .select("*,rooms(name),guests(fullName,email)");

  //  if filter is not null
  if (filter) query = query.eq(filter.field, filter.value);

  // SORTING
  if (sortBy) {
    query = query.order(sortBy.sortFieldName, {
      ascending: sortBy.direction === "asc",
    });
  }

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Bookings cannot be fetched");
  }

  return data;
};
