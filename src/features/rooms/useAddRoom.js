import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoom } from "../../services/apiRooms";
import toast from "react-hot-toast";

export function useAddRoom() {
  const queryClient = useQueryClient();
  const { isPending: isAdding, mutate: addRoomAPI } = useMutation({
    mutationFn: (body) => createRoom(body),
    onSuccess: () => {
      toast.success("New room added successfully");
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isAdding, addRoomAPI };
}
