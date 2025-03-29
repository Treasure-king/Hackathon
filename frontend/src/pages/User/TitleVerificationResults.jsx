import { useEffect, useState } from "react";

const TitleVerificationResults = () => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setResults({
        similarityScore: 85,
        suggestedTitles: ["AI and Education", "Machine Learning in Schools", "EdTech Innovations"],
      });
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">Title Verification Results</h1>
      <div className="max-w-lg mx-auto bg-base-100 shadow-lg p-6 rounded-lg">
        {results ? (
          <>
            <p className="text-lg font-semibold">Similarity Score: <span className="text-primary">{results.similarityScore}%</span></p>
            <h2 className="text-xl font-semibold mt-4">Suggested Alternatives:</h2>
            <ul className="list-disc list-inside text-lg text-gray-700 mt-2">
              {results.suggestedTitles.map((title, index) => (
                <li key={index}>{title}</li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-center">Checking title similarity...</p>
        )}
      </div>
    </div>
  );
};

export default TitleVerificationResults;
