import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useGetSettings() {
  const {
    data: settingsData,
    error,
    isPending: isFetchingSettings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settingsData, isFetchingSettings, error };
}
