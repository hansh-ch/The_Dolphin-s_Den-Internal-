import React from "react";

export default function ErrorMessage({ children }) {
  return (
    <span className="text-sm text-warning absolute right-4 ">{children}</span>
  );
}
