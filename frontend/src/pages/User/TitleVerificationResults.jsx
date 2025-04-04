import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useAuthContext } from "../../context/AuthContext"; // Import Auth Context

const TitleVerificationResults = () => {
  const { authUser } = useAuthContext(); // Get logged-in user data
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser?._id) return; // Ensure user ID exists before making API call

    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/titles/user-title/${authUser._id}`);
        const data = await response.json();
        if (response.ok) {
          setResults(data);
        } else {
          console.error("Error fetching results:", data.error);
        }
      } catch (error) {
        console.error("Server error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [authUser?._id]); // Depend on authUser ID

  const COLORS = ["#4CAF50", "#FF5252"];

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">Title Verification Results</h1>
      <div className="max-w-lg mx-auto bg-base-100 shadow-lg p-6 rounded-lg">
        {loading ? (
          <p className="text-center">Checking title similarity...</p>
        ) : results ? (
          <>
            <p className="text-lg font-semibold">Title: <span className="text-gray-700">{results.title}</span></p>
            <p className="text-lg font-semibold">
              Similarity Score: 
              <span className={`badge ${results.similarityScore > 50 ? "badge-error" : "badge-success"} ml-2`}>
                {results.similarityScore}%
              </span>
            </p>

            {/* Pie Chart */}
            <PieChart width={300} height={300} className="mx-auto">
              <Pie
                data={[
                  { name: "Similarity", value: results.similarityScore },
                  { name: "Unique", value: 100 - results.similarityScore },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {COLORS.map((color, index) => (
                  <Cell key={index} fill={color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>

            {/* Suggested Titles */}
            <h2 className="text-xl font-semibold mt-4">Suggested Alternatives:</h2>
            <ul className="list-disc list-inside text-lg text-gray-700 mt-2">
              {results.suggestedTitles.map((title, index) => (
                <li key={index}>{title}</li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-center text-error">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default TitleVerificationResults;
