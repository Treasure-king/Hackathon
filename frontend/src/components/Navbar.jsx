import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const {authUser} = useAuthContext()
  const {loading,logout} = useLogout()
  return (
    <nav className="navbar bg-base-100 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold text-primary">Title Verification System</h1>
        <div className="space-x-4">
          <Link to="/" className="btn btn-ghost">Home</Link>
          <Link to="/about" className="btn btn-ghost">About</Link>
          <Link to="/contact" className="btn btn-ghost">Contact</Link>

{
!authUser?(

  <button><Link to="/login" className="btn btn-primary">Login</Link></button>
):(
  <button className="btn btn-primary" onClick={logout}>Log out</button>
)
}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
