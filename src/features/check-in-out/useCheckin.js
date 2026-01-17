import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkinBooking, isPending: isCheckingIn } = useMutation({
    mutationKey: ["checkin"],
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checkin success`);
      //   invalidtae all query keys
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => {
      toast.error("Error : checkin failed");
    },
  });
  return { checkinBooking, isCheckingIn };
}
