import React from "react";
import { useForm } from "react-hook-form";
import { useGetSettings } from "./useGetSettings";
import Loader from "../../ui/Loader";
import { useUpdateSetting } from "./useUpdateSettings";

export default function SettingForm() {
  const { settingsData, isFetchingSettings, error } = useGetSettings();
  const { isUpdating, updateSettingAPI } = useUpdateSetting();
  const { register, handleSubmit } = useForm({
    defaultValues: settingsData,
  });

  if (isFetchingSettings) return <Loader />;

  const {
    maxBookingLength,
    maxGuestPerBooking,
    minBookingLength,
    breakfastPrice,
  } = settingsData;

  function handleUpdate(data) {
    updateSettingAPI(data);
  }

  const isDisabled = isFetchingSettings || isUpdating;
  return (
    <form
      className="max-w-6xl mx-auto p-4 mt-6 relative"
      onSubmit={handleSubmit(handleUpdate)}
    >
      <ul className="flex flex-col gap-2 max-w-lg mx-auto">
        <li className="flex items-center justify-between">
          <label htmlFor="minNights" className="font-semibold">
            Minimun nights/bookings
          </label>
          <input
            type="number"
            className="input w-40 text-right "
            id="minNights"
            disabled={isDisabled}
            defaultValue={minBookingLength}
            {...register("minBookingLength", {
              required: "This is required",
            })}
          />
        </li>
        <li className="flex items-center justify-between">
          <label htmlFor="maxNights" className="font-semibold">
            Maximum nights/bookings
          </label>
          <input
            type="number"
            className="input w-40 text-right "
            id="maxNights"
            disabled={isDisabled}
            defaultValue={maxBookingLength}
            {...register("maxBookingLength", {
              required: "This is required",
            })}
          />
        </li>
        <li className="flex items-center justify-between">
          <label htmlFor="maxGuests" className="font-semibold">
            Maximum guests/bookings
          </label>
          <input
            type="number"
            className="input w-40 text-right "
            id="maxGuests"
            disabled={isDisabled}
            defaultValue={maxGuestPerBooking}
            {...register("maxGuestPerBooking", {
              required: "This is required",
            })}
          />
        </li>
        <li className="flex items-center justify-between">
          <label htmlFor="breakfastPrice" className="font-semibold">
            Breakfast price
          </label>
          <input
            type="number"
            className="input w-40 text-right "
            id="breakfastPrice"
            disabled={isDisabled}
            defaultValue={breakfastPrice}
            {...register("breakfastPrice", {
              required: "This is required",
            })}
          />
        </li>

        <li className="flex items-center justify-between mt-8">
          <button className="btn btn-primary ms-auto">Update</button>
        </li>
      </ul>
    </form>
  );
}
