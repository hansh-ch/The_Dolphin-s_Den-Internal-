import React from "react";
import Logout from "./Logout";

export default function Header() {
  return (
    <header className="border-b border-b-accent-content py-3 px-12 bg-base-200">
      <div>
        <Logout />
      </div>
    </header>
  );
}
