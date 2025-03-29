import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav 
      className="bg-base-100 shadow-md sticky top-0 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-bold text-primary flex items-center">
          <span className="mr-2">✅</span> Title Verification
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="btn btn-ghost">Home</Link>
          <Link to="/about" className="btn btn-ghost">About</Link>
          <Link to="/contact" className="btn btn-ghost">Contact</Link>
        </div>

        {/* Authentication Section */}
        <div className="hidden md:flex items-center space-x-4">
          {authUser ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost flex items-center gap-2">
                <FaUserCircle className="text-2xl" />
                {authUser.fullname}
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48">
                <li><Link to="/profile">Profile</Link></li>
                <li><button onClick={logout} className="btn btn-error btn-sm mt-2">Logout</button></li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-base-100 shadow-md p-4">
          <Link to="/" className="block py-2">Home</Link>
          <Link to="/about" className="block py-2">About</Link>
          <Link to="/contact" className="block py-2">Contact</Link>
          {authUser ? (
            <>
              <hr className="my-2"/>
              <p className="text-center font-semibold">{authUser.fullname}</p>
              <button onClick={logout} className="btn btn-error btn-block mt-2">Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block mt-2">Login</Link>
          )}
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
