import { Routes, Route, Navigate } from "react-router-dom";
import MasterLayout from "./components/MasterLayout/MasterLayout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import UserDashboard from "./pages/User/UserDashboard";
import SubmitTitle from "./pages/User/SubmitTitle";
import TitleVerificationResults from "./pages/User/TitleVerificationResults";
import SubmissionHistory from "./pages/User/SubmissionHistory";
import Profile from "./pages/User/Profile";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { useAuthContext } from "./context/AuthContext";
import AdminLogin from "./pages/Admin/AdminLogin";

function App() {
  const { authUser } = useAuthContext();
  
  return (
    <Routes>
      {/* Master Layout - Common Pages with Header/Footer */}
      <Route path="/" element={<MasterLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Authentication Routes */}
      <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
      {/* <Route path="/admin/login" element={authUser ? <Navigate to="/admin" /> : <AdminLogin/>} /> */}

      {/* User Routes - Protected */}
      <Route path="/user" element={authUser ? <UserDashboard /> : <Navigate to="/login" />}>
        <Route path="submit-title" element={<SubmitTitle />} />
        <Route path="verification-results" element={<TitleVerificationResults />} />
        <Route path="submission-history" element={<SubmissionHistory />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Admin Routes - Protected */}
        <Route path="/admin" element={authUser?<AdminDashboard/>:<Login/>} />
        
    </Routes>
  );
}

export default App;
