import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logoutUser, isPending: isLoggingOut } = useMutation({
    mutationKey: ["user"],
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });

  return { logoutUser, isLoggingOut };
}
