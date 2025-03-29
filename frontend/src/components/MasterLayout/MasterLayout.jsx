import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footor";


const MasterLayout = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="container mx-auto py-6 px-4">
        <Outlet />  {/* This will render the page content */}
      </div>
      <Footer />
    </div>
  );
};

export default MasterLayout;
