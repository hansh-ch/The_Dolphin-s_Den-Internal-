import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className=" h-screen  grid grid-cols-[16rem_1fr] grid-rows-[auto_1fr] overflow-x-hidden  ">
      <Header />
      <Sidebar />
      <main className="py-4 p-4 overflow-scroll">
        <Outlet />
      </main>
    </div>
  );
}
