import { useState, useEffect } from "react";

const SubmissionHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/titles/history", {
          method: "GET",
          credentials: "include", // Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }

        const data = await response.json();
        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">Submission History</h1>
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center p-5">Loading...</p>
        ) : error ? (
          <p className="text-center p-5 text-red-500">{error}</p>
        ) : history.length > 0 ? (
          <table className="table w-full border rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-black">
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Submission Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{item.title}</td>
                  <td
                    className={`p-3 ${item.status === "Approved"
                        ? "text-green-600"
                        : item.status === "Pending"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                  >
                    {item.status}
                  </td>
                  <td className="p-3">{new Date(item.
                    createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center p-5">No submissions found.</p>
        )}
      </div>
    </div>
  );
};

export default SubmissionHistory;
