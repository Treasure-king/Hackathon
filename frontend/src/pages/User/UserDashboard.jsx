import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [submittedTitles, setSubmittedTitles] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Simulating user authentication
//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (!user) {
//       navigate("/login");
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

  // Validate title submission
  const validateForm = () => {
    let newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle title submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);

      // Simulating API request
      setTimeout(() => {
        setSubmittedTitles([...submittedTitles, title]);
        showToast("Title submitted for verification!", "success");
        setTitle("");
        setLoading(false);
      }, 2000);
    } else {
      showToast("Please fix errors before submitting!", "error");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    showToast("Logged out successfully!", "success");
    navigate("/login");
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">Dashboard</h1>
      <p className="text-lg text-center max-w-2xl mx-auto mb-8">
        Submit a new title for verification and view your submitted titles.
      </p>

      {/* Title Submission Form */}
      <div className="max-w-lg mx-auto bg-base-100 shadow-lg p-6 rounded-lg">
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Enter Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter new title"
              className={`input input-bordered w-full ${errors.title ? "input-error" : ""}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="text-error text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Title"}
          </button>
        </form>
      </div>

      {/* Submitted Titles List */}
      <div className="max-w-lg mx-auto bg-base-100 shadow-lg p-6 rounded-lg mt-6">
        <h2 className="text-xl font-bold mb-4">Submitted Titles</h2>
        {submittedTitles.length > 0 ? (
          <ul className="list-disc list-inside">
            {submittedTitles.map((t, index) => (
              <li key={index} className="p-2 border-b">{t}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No titles submitted yet.</p>
        )}
      </div>

      {/* Logout Button */}
      <div className="text-center mt-6">
        <button onClick={handleLogout} className="btn btn-error">Logout</button>
      </div>
    </div>
  );
};

export default UserDashboard;
