import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkoutBooking, isPending: isCheckingOut } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checkout success`);
      //   invalidtae all query keys
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("Error : checkout failed");
    },
  });
  return { checkoutBooking, isCheckingOut };
}
