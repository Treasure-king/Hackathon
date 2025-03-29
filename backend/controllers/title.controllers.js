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


// Get all submitted titles (Admin view)
export const getAllTitles = async (req, res) => {
  try {
    const titles = await Title.find().populate("userId", "fullName");
    res.json(titles);
  } catch (error) {
    console.error("Error fetching titles:", error);
    res.status(500).json({ error: "Error fetching titles" });
  }
};

// Update title status (Approve/Reject)
export const updateTitleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updatedTitle = await Title.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedTitle) {
      return res.status(404).json({ error: "Title not found" });
    }

    res.json({ message: "Title status updated", updatedTitle });
  } catch (error) {
    console.error("Error updating title status:", error);
    res.status(500).json({ error: "Error updating title status" });
  }
};

// **Simple Similarity Function**
function calculateSimilarity(title1, title2) {
  if (!title1 || !title2) return 0; // Prevent crash

  const words1 = new Set(title1.toLowerCase().split(" "));
  const words2 = new Set(title2.toLowerCase().split(" "));
  const intersection = new Set([...words1].filter(x => words2.has(x)));

  return (intersection.size / Math.max(words1.size, words2.size)) * 100;
}