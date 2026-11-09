const express = require("express");
const { getDB } = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const database = getDB();
    const collection = database.collection("bathrooms");
    const bathrooms = await collection
      .find({}, { projection: { _id: 0 } })
      .sort({ bathroomId: 1 })
      .toArray();

    res.json(bathrooms);
  } catch {
    res.status(500).json({ error: "Could not load restrooms." });
  }
});

const allowedTags = [
  "Old",
  "Modern",
  "Clean",
  "Accessible",
  "Urinals",
  "Stalls"
];

router.post("/:bathroomId/reviews", async (req, res) => {
  const bathroomId = Number(req.params.bathroomId);
  let rating;
  let tags;

  if (req.body) {
    rating = req.body.rating;
    tags = req.body.tags;
  }

  if (!Number.isSafeInteger(bathroomId) || bathroomId < 1) {
    return res.status(400).json({ error: "Invalid restroom ID." });
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({
      error: "Choose a whole-number rating from 1 to 5."
    });
  }

  if (!Array.isArray(tags) || tags.length > allowedTags.length) {
    return res.status(400).json({ error: "Invalid review tags." });
  }

  const selectedTags = [];

  for (const tag of tags) {
    if (!allowedTags.includes(tag) || selectedTags.includes(tag)) {
      return res.status(400).json({ error: "Invalid review tags." });
    }

    selectedTags.push(tag);
  }

  const review = {
    rating: rating,
    tags: selectedTags,
    createdAt: new Date()
  };

  try {
    const database = getDB();
    const collection = database.collection("bathrooms");

    const bathroom = await collection.findOneAndUpdate(
      { bathroomId: bathroomId },
      { $push: { reviews: review } },
      {
        returnDocument: "after",
        projection: { _id: 0 }
      }
    );

    if (!bathroom) {
      return res.status(404).json({ error: "Restroom not found." });
    }

    return res.status(201).json(bathroom);
  } catch {
    return res.status(500).json({
      error: "Could not save your review. Please try again."
    });
  }
});

module.exports = router;
