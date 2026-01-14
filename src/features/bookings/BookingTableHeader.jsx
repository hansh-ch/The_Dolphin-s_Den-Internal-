import React from "react";

export default function BookingTableHeder() {
  return (
    <div className="w-full grid grid-cols-[0.6fr_2fr_2.4fr_1.4fr_1fr_3.6rem] items-center  border border-accent/25 shadow-sm py-6 px-3 gap-6 mt-4 ">
      <div className="uppercase font-bold  text-center">Cabin</div>
      <div className="uppercase font-bold  text-center">Guest</div>
      <div className="uppercase font-bold  text-center">Dates</div>
      <div className="uppercase font-bold  text-center">Status</div>
      <div className="uppercase font-bold  text-center">Amount</div>
      <div className="uppercase font-bold  text-center">Action</div>
    </div>
  );
}
