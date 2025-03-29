import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [submittedTitles, setSubmittedTitles] = useState([]);
  const [loading, setLoading] = useState(false);

  const { logout } = useLogout();

  useEffect(() => {
    const fetchTitles = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/titles/all", { credentials: "include" });
        const data = await response.json();
        if (response.ok) {
          setSubmittedTitles(data);
        } else {
          console.error("Error fetching titles:", data.error);
        }
      } catch (error) {
        console.error("Server error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTitles();
  }, []);

  const showToast = (message, type) => {
    const toast = document.createElement("div");
    toast.className = `alert alert-${type} fixed bottom-4 right-4 w-fit p-3 shadow-lg`;
    toast.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleDecision = async (id, decision) => {
    try {
      const response = await fetch(`/api/titles/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: decision }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setSubmittedTitles((prevTitles) =>
          prevTitles.map((t) => (t._id === id ? { ...t, status: decision } : t))
        );
        showToast(`Title marked as ${decision}!`, decision === "Approved" ? "success" : "error");
      } else {
        showToast(data.error, "error");
      }
    } catch (error) {
      console.error("Server error:", error);
      showToast("Failed to update title status.", "error");
    }
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">Admin Dashboard</h1>
      <p className="text-lg text-center max-w-2xl mx-auto mb-8">
        Manage user-submitted titles by approving or rejecting them.
      </p>

      <div className="max-w-lg mx-auto bg-base-100 shadow-lg p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Submitted Titles</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : submittedTitles.length > 0 ? (
          <ul className="list-disc list-inside">
            {submittedTitles.map((t) => (
              <li key={t._id} className="p-3 border-b flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className={`badge badge-${t.status === "Approved" ? "success" : t.status === "Rejected" ? "error" : "warning"}`}>
                    {t.status}
                  </span>
                  <span>{t.title}</span>
                </div>
                <p className="text-sm text-gray-500">Submitted by: <strong>{t.userId?.fullName || "Unknown"}</strong></p>
                <p className="text-sm text-gray-500">similarityScore: <strong>{t.similarityScore || "Unknown"}</strong></p>
                {t.status === "Pending" && (
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleDecision(t._id, "Approved")} className="btn btn-success btn-sm">
                      Approve
                    </button>
                    <button onClick={() => handleDecision(t._id, "Rejected")} className="btn btn-error btn-sm">
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

      <div className="text-center mt-6">
        <button onClick={logout} className="btn btn-error">Logout</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
