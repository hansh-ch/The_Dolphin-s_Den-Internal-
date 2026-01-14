import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoom } from "../../services/apiRooms";
import toast from "react-hot-toast";

export function useDeleteRoom() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteRoomAPI } = useMutation({
    mutationFn: (roomId) => deleteRoom(roomId),
    onSuccess: () => {
      toast.success("Room deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
    },
    onError: (err) => {
      toast.error("Cannot delete room");
    },
  });
  return { isDeleting, deleteRoomAPI };
}
