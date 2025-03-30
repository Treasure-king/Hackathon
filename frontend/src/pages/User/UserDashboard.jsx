import { Outlet, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { FaHistory } from "react-icons/fa";

const UserDashboard = () => {
  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar */}
      <motion.aside 
        className="w-64 bg-base-100 shadow-lg p-5 flex flex-col"
        initial={{ x: -50, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-primary text-center mb-6">Dashboard</h2>
        
        <nav className="space-y-3">
          <NavLink 
            to="submit-Title" 
            className={({ isActive }) => `btn btn-ghost flex items-center gap-3 w-full ${isActive ? "btn-primary" : ""}`}
          >
            <FiHome className="text-lg" />
            Home
          </NavLink>

          <NavLink 
            to="profile" 
            className={({ isActive }) => `btn btn-ghost flex items-center gap-3 w-full ${isActive ? "btn-primary" : ""}`}
          >
            <FiUser className="text-lg" />
            Profile
          </NavLink>

          <NavLink 
            to="submission-history" 
            className={({ isActive }) => `btn btn-ghost flex items-center gap-3 w-full ${isActive ? "btn-primary" : ""}`}
          >
            <FaHistory className="text-lg" />
            History
          </NavLink>

          <button className="btn btn-error flex items-center gap-3 mt-6 ml-14">
            <FiLogOut className="text-lg" />
            Logout
          </button>
        </nav>
      </motion.aside> 

      {/* Main Content */}
      <motion.main 
        className="flex-1 p-6"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-3xl font-bold text-primary mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          User Dashboard
        </motion.h1>

        {/* Dashboard Content */}
        <motion.div 
          className="bg-base-100 shadow-lg rounded-xl p-6"
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <Outlet /> {/* Renders nested routes here */}
        </motion.div>
      </motion.main>
    </div>
  );
};

export default UserDashboard;
