import { Outlet } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <Outlet /> {/* Renders the nested routes inside UserDashboard */}
    </div>
  );
};

export default UserDashboard;
