import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
const MainLayout = () => {
  return (
    <div className="pt-6 md:px-10">
      <Navbar />
      <div className="px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
