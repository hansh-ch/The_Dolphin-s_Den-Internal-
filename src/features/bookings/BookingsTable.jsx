import React from "react";
import NodataToShow from "../../ui/NodataToShow";
import BookingItem from "./BookingItem";

export default function BookingsTable({ data, render }) {
  if (!data.length) {
    return <NodataToShow resourceName="bookings" />;
  }
  return <ul className="space-y-2">{data.map(render)}</ul>;
}
