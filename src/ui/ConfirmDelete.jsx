import React from "react";

export default function ConfirmDelete({
  onCancel,
  onConfirm,
  resourceName = "",
}) {
  function handleConfirm() {
    onConfirm();
    onCancel();
  }
  return (
    <div className=" bg-info/80 w-md mx-auto shadow-2xl flex justify-center items-center flex-col p-6 mt-6 rounded-md">
      <div className="text-center">
        <h3 className="text-center text-xl mb-2">Delete {resourceName}</h3>
        <p>
          Are you sure you want to delete {resourceName} permanently ? This
          action cannot be undone
        </p>
      </div>
      <div className="flex items-center gap-4 mt-6">
        <button className="btn btn-outline " onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-error " onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
}
