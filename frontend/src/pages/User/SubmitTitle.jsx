import { useState } from "react";
import useSubmitTitle from "../../hooks/useSubmitTitle";

const SubmitTitle = () => {
  const [title, setTitle] = useState("");
  const { submitTitle, loading } = useSubmitTitle();

  const showToast = (message, type) => {
    const toast = document.createElement("div");
    toast.className = `alert alert-${type} fixed bottom-4 right-4 w-fit p-3 shadow-lg`;
    toast.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitTitle(title);

    if (result.error) {
      showToast(result.error, "error");
    } else {
      showToast(`Title submitted! Similarity: ${result.similarityScore}%`, "success");
      setTitle("");
    }
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">Submit a Title</h1>
      <div className="max-w-lg mx-auto bg-base-100 shadow-lg p-6 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label"><span className="label-text">Enter Title</span></label>
            <input
              type="text"
              placeholder="Enter your title"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Title"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitTitle;
