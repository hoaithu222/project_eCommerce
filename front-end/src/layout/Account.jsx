import { Outlet } from "react-router-dom";

import UserMenu from "../components/UserMenu";

export default function Account() {
  return (
    <section className="bg-gray-50 ">
      <div className="container mx-auto p-3 grid lg:grid-cols-[300px,1fr] ">
        <div className="py-2 md:py-3 lg:py-4 sticky top-24 max-h-[calc(100vh - 96px)] overflow-y-auto hidden lg:block border-r-2  ">
          <UserMenu isFullPage={true} />
        </div>
        <div className="p-1 md:p-3 lg:p-4 max-h-[96vh] overflow-y-auto hidden-scrollbar">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
