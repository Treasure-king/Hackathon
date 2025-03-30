import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import useLogout from "../../hooks/useLogout";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [submittedTitles, setSubmittedTitles] = useState([]);
  const [loading, setLoading] = useState(false);

  const {logout} = useLogout()
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

  const handleDecision = async (id, decision) => {
    try {
      const response = await fetch(`/api/titles/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: decision }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setSubmittedTitles((prevTitles) =>
          prevTitles.map((t) => (t._id === id ? { ...t, status: decision } : t))
        );
      } else {
        console.error("Error updating title status:", data.error);
      }
    } catch (error) {
      console.error("Server error:", error);
    }
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">Admin Dashboard</h1>
      <p className="text-lg text-center max-w-2xl mx-auto mb-8">
        Manage user-submitted titles by approving or rejecting them.
      </p>

      <div className="max-w-4xl mx-auto bg-base-100 shadow-xl p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4">Submitted Titles</h2>
        {loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : submittedTitles.length > 0 ? (
          <div className="space-y-4">
            {submittedTitles.map((t) => (
              <div key={t._id} className="p-4 bg-base-200 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">{t.title}</h3>
                  <span
                    className={`badge badge-${
                      t.status === "Approved" ? "success" : t.status === "Rejected" ? "error" : "warning"
                    } px-4 py-2 text-sm`}
                  >
                    {t.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Submitted by: <strong>{t.userId?.fullName || "Unknown"}</strong>
                </p>
                <p className="text-sm text-gray-500">
                  Similarity Score: <strong>{t.similarityScore || "N/A"}</strong>
                </p>
                {t.status === "Pending" && (
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => handleDecision(t._id, "Approved")}
                      className="btn btn-success btn-sm flex items-center gap-2"
                    >
                      <FaCheckCircle /> Approve
                    </button>
                    <button
                      onClick={() => handleDecision(t._id, "Rejected")}
                      className="btn btn-error btn-sm flex items-center gap-2"
                    >
                      <FaTimesCircle /> Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No submitted titles found.</p>
        )}
      </div>

      <div className="text-center mt-6">
        <button onClick={logout} className="btn btn-error btn-lg">Logout</button>
      </div>
    </div>
  );
};

export default AdminDashboard;