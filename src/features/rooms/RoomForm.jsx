import { useForm } from "react-hook-form";
import ErrorMessage from "../../ui/ErrorMessage";
import { useAddRoom } from "./useAddRoom";
import { useEditRoom } from "./useEditRoom";

export default function RoomForm({ roomToEdit = {}, onAddCloseModal, onEdit }) {
  const { id: roomEditId, ...editRoomValues } = roomToEdit;
  const isEditSession = Boolean(roomEditId);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editRoomValues : {},
  });

  const { isAdding, addRoomAPI } = useAddRoom();
  const { isEditing, editRoomAPI } = useEditRoom();

  // Handle form submition
  function handleSubmitForm(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    const body = { ...data, image: image };

    if (isEditSession) {
      editRoomAPI(
        { id: roomEditId, body },
        {
          onSuccess: () => {
            onEdit(false);
          },
        }
      );
    } else {
      addRoomAPI(body, {
        onSuccess: () => {
          reset();
          onAddCloseModal?.();
        },
      });
    }
  }

  function onError(errors) {
    console.log(errors);
  }
  const isDisabled = isAdding || isEditing;
  return (
    <form
      className="p-4 mt-6 relative w-lg "
      onSubmit={handleSubmit(handleSubmitForm, onError)}
    >
      <ul className="flex flex-col gap-2  w-full">
        <li className="flex items-center justify-between">
          <label htmlFor="room" className="font-semibold">
            Room name
          </label>
          <input
            type="text"
            placeholder="e.g. 001"
            className="input"
            id="room"
            disabled={isDisabled}
            {...register("name", {
              required: "This field is required",
            })}
          />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </li>

        <li className="flex items-center justify-between">
          <label htmlFor="capacity" className="font-semibold">
            Maximum capacity
          </label>
          <input
            type="number"
            placeholder="e.g. 2"
            className="input"
            id="capacity"
            disabled={isDisabled}
            {...register("maxCapacity", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Capacity should be atleast 1",
              },
            })}
          />
          <ErrorMessage>{errors?.maxCapacity?.message}</ErrorMessage>
        </li>

        <li className="flex items-center justify-between">
          <label htmlFor="regularPrice" className="font-semibold">
            Regular price
          </label>
          <input
            type="number"
            placeholder=""
            className="input"
            id="regularPrice"
            disabled={isDisabled}
            {...register("regularPrice", {
              required: "This field is required",
              min: {
                value: 10,
                message: "Price should be atleast 10",
              },
            })}
          />
          <ErrorMessage>{errors?.regularPrice?.message}</ErrorMessage>
        </li>

        <li className="flex items-center justify-between">
          <label htmlFor="discount" className="font-semibold">
            Discount
          </label>
          <input
            type="number"
            placeholder=""
            className="input"
            id="discount"
            disabled={isDisabled}
            {...register("discount", {
              required: "This field is required",
              validate: (value) =>
                value < Number(getValues("regularPrice")) ||
                "Discount should be less than regular price",
            })}
          />
          <ErrorMessage>{errors?.discount?.message}</ErrorMessage>
        </li>

        <li className="flex items-center justify-between">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <textarea
            name=""
            id="description"
            className="textarea"
            disabled={isDisabled}
            {...register("description", {
              required: "This field is required",
            })}
          ></textarea>
          <ErrorMessage>{errors?.description?.message}</ErrorMessage>
        </li>

        <li className="flex items-center justify-between">
          <label htmlFor="photo" className="font-semibold">
            Room photo
          </label>
          <input
            type="file"
            className="file-input file-input-primary"
            id="image"
            accept="image/*"
            disabled={isDisabled}
            {...register("image", {
              required: isEditSession ? false : "Image is required",
            })}
          />
        </li>
      </ul>
      <div className="flex items-center justify-end gap-2 mt-4">
        <button className="btn btn-outline" type="reset" disabled={isDisabled}>
          Cancel
        </button>
        <button
          className="btn btn-primary disabled:opacity-30"
          type="submit"
          disabled={isDisabled}
        >
          {isEditSession ? "Edit Room" : "Add room"}
        </button>
      </div>
    </form>
  );
}
