import { useState, useEffect } from "react";

const SubmissionHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setHistory([
        { title: "AI in Healthcare", status: "Approved", date: "2025-03-25" },
        { title: "Quantum Computing", status: "Rejected", date: "2025-03-26" },
        { title: "Blockchain for Security", status: "Pending", date: "2025-03-28" },
      ]);
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">Submission History</h1>
      <div className="overflow-x-auto">
        <table className="table w-full border rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Submission Date</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{item.title}</td>
                  <td className={`p-3 ${item.status === "Approved" ? "text-green-600" : item.status === "Pending" ? "text-yellow-500" : "text-red-500"}`}>
                    {item.status}
                  </td>
                  <td className="p-3">{item.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-5">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionHistory;
