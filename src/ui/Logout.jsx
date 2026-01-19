import React from "react";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "../features/authentication/useLogout";

export default function Logout() {
  const { logoutUser, isLoggingOut } = useLogout();
  return (
    <button
      className="btn btn-outline btn-sm flex"
      disabled={isLoggingOut}
      onClick={logoutUser}
    >
      <span>Logout</span> <HiArrowRightOnRectangle />
    </button>
  );
}
