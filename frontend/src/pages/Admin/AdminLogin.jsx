import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  // Validate form inputs
  const validateForm = () => {
    let newErrors = {};
    if (!email.includes("@")) {
      newErrors.email = "Valid email is required";
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);

      // Simulated admin credentials
      setTimeout(() => {
        if (email === "admin@example.com" && password === "admin123") {
          localStorage.setItem("admin", "true");
          showToast("Login successful!", "success");
          navigate("/admin-dashboard");
        } else {
          showToast("Invalid credentials!", "error");
        }
        setLoading(false);
      }, 1500);
    } else {
      showToast("Please fix errors before submitting!", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-center text-primary mb-6">Admin Login</h1>

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-error text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
