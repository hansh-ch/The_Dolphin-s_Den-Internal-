import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSettings } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateSettingAPI } = useMutation({
    mutationFn: (body) => updateSettings(body),
    onSuccess: () => {
      toast.success("Settings updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUpdating, updateSettingAPI };
}
