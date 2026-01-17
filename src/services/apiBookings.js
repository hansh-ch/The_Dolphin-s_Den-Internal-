import { PAGE_SIZE } from "../utils/constant";
import { supabase } from "./supabase";

export const getBookings = async ({ filter, sortBy, pageNo }) => {
  let query = supabase
    .from("bookings")
    .select("*,rooms(name),guests(fullName,email)", { count: "exact" });
  //  if filter is not null
  if (filter) query = query.eq(filter.field, filter.value);

  // SORTING
  if (sortBy) {
    query = query.order(sortBy.sortFieldName, {
      ascending: sortBy.direction === "asc",
    });
  }

  // PAGE
  if (pageNo) {
    const from = (pageNo - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error("Bookings cannot be fetched");
  }

  return { data, count };
};

export const getBookingById = async (id) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*,rooms(*),guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Bookings cannot be fetched");
  }
  return data;
};

export const updateBooking = async (id, obj) => {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Cannot update booking");
  }
  return data;
};

export const deleteBookingApi = async (id) => {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Could not delete booking");
  }
  return data;
};
