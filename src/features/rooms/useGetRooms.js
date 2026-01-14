import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../../services/apiRooms";

export function useGetRooms() {
  const {
    isPending: isGettingRooms,
    isError,
    data: rooms,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  return { rooms, isGettingRooms };
}
