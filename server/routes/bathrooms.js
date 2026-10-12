const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const bathrooms = [
    {
      bathroomId: 101,
      bathroomName: "Student Center - First Floor",
      category: "Gender Neutral",
      latitude: 39.7099,
      longitude: -75.1181,
      address: "201 Mullica Hill Road",
      description: "Single-person restroom near the main entrance.",
      image: "images/student-center.jpg",

      features: {
        accessible: true,
        changingTable: false,
        genderNeutral: true
      },

      reviews: [
        {
          rating: 5,
          cleanliness: 5,
          privacy: 4,
          comment: "Very clean."
        },

        {
          rating: 4,
          cleanliness: 4,
          privacy: 5,
          comment: "Good bathroom overall."
        }
      ]
    }
  ];

  res.json(bathrooms);
});

module.exports = router;