import Title from "../models/Title.models.js";

export const SubmitTitle= async (req, res) => {
  try {
    const { title } = req.body;
    const existingTitles = await Title.find(); // Fetch all titles for similarity check

    // **Basic Similarity Check (You can replace this with NLP model)**
    let maxSimilarity = 0;
    for (let t of existingTitles) {
      const similarity = calculateSimilarity(title, t.title);
      if (similarity > maxSimilarity) maxSimilarity = similarity;
    }

    const newTitle = new Title({
      userId: req.user.id,
      title,
      similarityScore: maxSimilarity,
    });
    await newTitle.save();
    res.json({ message: "Title submitted", similarityScore: maxSimilarity });
  } catch (error) {
    res.status(500).json({ error: "Error submitting title" });
  }
};

// Fetch User Submission History
export const getHistory = async (req, res) => {
  try {
    const userTitles = await Title.find({ userId: req.user.id });
    res.json(userTitles);
  } catch (error) {
    res.status(500).json({ error: "Error fetching history" });
  }
};

// **Simple Similarity Function**
function calculateSimilarity(title1, title2) {
  const words1 = new Set(title1.toLowerCase().split(" "));
  const words2 = new Set(title2.toLowerCase().split(" "));
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  return (intersection.size / Math.max(words1.size, words2.size)) * 100;
}
