import React from "react";

export default function Loader() {
  return (
    <div className="min-h-screen w-full grid place-content-center">
      <span className="loading loading-spinner text-primary"></span>
    </div>
  );
}
