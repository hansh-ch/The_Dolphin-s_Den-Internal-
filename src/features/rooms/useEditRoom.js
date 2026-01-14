import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editRoom } from "../../services/apiRooms";

export function useEditRoom() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editRoomAPI } = useMutation({
    mutationFn: ({ id, body }) => editRoom(id, body),
    onSuccess: () => {
      toast.success("Room editted successfully");
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isEditing, editRoomAPI };
}
