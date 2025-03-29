import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [submittedTitles, setSubmittedTitles] = useState([]);

  // Simulating admin authentication
//   useEffect(() => {
//     const admin = localStorage.getItem("admin");
//     if (!admin) {
//       navigate("/admin-login");
//     }
//   }, [navigate]);

  // Show toast notification
  const showToast = (message, type) => {
    const toast = document.createElement("div");
    toast.className = `alert alert-${type} fixed bottom-4 right-4 w-fit p-3 shadow-lg`;
    toast.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  // Simulated titles (will be fetched from backend in real case)
  useEffect(() => {
    setSubmittedTitles([
      { id: 1, title: "New AI Technology", status: "Pending" },
      { id: 2, title: "Machine Learning Trends", status: "Pending" },
    ]);
  }, []);

  // Handle approval or rejection
  const handleDecision = (id, decision) => {
    setSubmittedTitles((prevTitles) =>
      prevTitles.map((t) => (t.id === id ? { ...t, status: decision } : t))
    );
    showToast(`Title marked as ${decision}!`, decision === "Approved" ? "success" : "error");
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("admin");
    showToast("Logged out successfully!", "success");
    navigate("/admin-login");
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">Admin Dashboard</h1>
      <p className="text-lg text-center max-w-2xl mx-auto mb-8">
        Manage user-submitted titles by approving or rejecting them.
      </p>

      {/* Submitted Titles List */}
      <div className="max-w-lg mx-auto bg-base-100 shadow-lg p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Submitted Titles</h2>
        {submittedTitles.length > 0 ? (
          <ul className="list-disc list-inside">
            {submittedTitles.map((t) => (
              <li key={t.id} className="p-3 border-b flex justify-between items-center">
                <span className={`badge badge-${t.status === "Approved" ? "success" : t.status === "Rejected" ? "error" : "warning"}`}>
                  {t.status}
                </span>
                <span>{t.title}</span>
                {t.status === "Pending" && (
                  <div className="flex gap-2">
                    <button onClick={() => handleDecision(t.id, "Approved")} className="btn btn-success btn-sm">
                      Approve
                    </button>
                    <button onClick={() => handleDecision(t.id, "Rejected")} className="btn btn-error btn-sm">
                      Reject
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No submitted titles found.</p>
        )}
      </div>

      {/* Logout Button */}
      <div className="text-center mt-6">
        <button onClick={handleLogout} className="btn btn-error">Logout</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
