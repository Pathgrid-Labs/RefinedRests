const express = require("express");
const { getDB } = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const bathrooms = await getDB()
      .collection("bathrooms")
      .find({}, { projection: { _id: 0 } })
      .sort({ bathroomId: 1 })
      .toArray();

    res.json(bathrooms);
  } catch {
    res.status(500).json({ error: "Could not load restrooms." });
  }
});

module.exports = router;