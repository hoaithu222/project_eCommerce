import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function DefaultShop() {
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <main className="w-full min-h-[96vh] overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
