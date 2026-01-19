import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser as loginUserApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: loginUser, isPending: isLogging } = useMutation({
    mutationKey: ["user"],
    mutationFn: (body) => loginUserApi(body),
    onSuccess: (data) => {
      queryClient.setQueriesData(["user"], data?.user);
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Email or password is incorrect");
    },
  });

  return { loginUser, isLogging };
}
