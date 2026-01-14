import React from "react";

export default function NodataToShow({ resourceName }) {
  return (
    <div className="flex justify-center shadow p-4 rounded bg-base-200">
      <p className="text-xl">No {resourceName} to show at moment !</p>
    </div>
  );
}
