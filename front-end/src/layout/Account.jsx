import { Outlet } from "react-router-dom";

import UserMenu from "../components/UserMenu";

export default function Account() {
  return (
    <section className="bg-white">
      <div className="container mx-auto p-3 grid lg:grid-cols-[300px,1fr] ">
        {/* left for menu */}
        <div className="py-4 sticky top-24 max-h-[calc(100vh - 96px)] overflow-y-auto hidden lg:block border-r-2  ">
          <UserMenu isFullPage={true} />
        </div>

        {/* right for content */}
        <div className=" p-4 min-h-[90vh]">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
