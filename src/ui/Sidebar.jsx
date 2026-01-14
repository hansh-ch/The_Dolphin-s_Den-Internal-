import React from "react";
import Logo from "./Logo";
import MainNav from "./MainNav";

export default function Sidebar() {
  return (
    <aside className="py-8 px-6 border-r border-r-accent-content row-span-full bg-base-100">
      <Logo />
      <MainNav />
    </aside>
  );
}
