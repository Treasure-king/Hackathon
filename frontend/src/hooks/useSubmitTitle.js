import { useState } from "react";

const useSubmitTitle = () => {
  const [loading, setLoading] = useState(false);

  const submitTitle = async (title) => {
    if (title.trim().length < 5) {
      return { error: "Title must be at least 5 characters!" };
    }

    setLoading(true);
    try {
      const response = await fetch("/api/titles/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("user")}`, // Ensure user is authenticated
        },
        body: JSON.stringify({ title }),
      });
      console.log(response);
      

      const data = await response.json();
      setLoading(false);
      if (!response.ok) {
        return { error: data.error || "Failed to submit title" };
      }

      return { success: data.message, similarityScore: data.similarityScore };
    } catch (error) {
      setLoading(false);
      return { error: "Server error. Please try again later." };
    }
  };

  return { submitTitle, loading };
};

export default useSubmitTitle;
