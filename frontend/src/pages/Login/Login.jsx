import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // State for input fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Error state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  // Form validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);

      // Simulating an API login request
      setTimeout(() => {
        if (formData.email === "admin@example.com" && formData.password === "password123") {
          showToast("Login successful!", "success");
          navigate("/dashboard"); // Redirect to dashboard
        } else {
          showToast("Invalid credentials!", "error");
        }
        setIsSubmitting(false);
      }, 2000);
    } else {
      showToast("Please fix errors before submitting!", "error");
    }
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">Login</h1>
      <p className="text-lg text-center max-w-2xl mx-auto mb-8">
        Enter your credentials to access your account.
      </p>

      {/* Login Form */}
      <div className="max-w-lg mx-auto bg-base-100 shadow-lg p-6 rounded-lg">
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              placeholder="Enter your password"
              className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-error text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
