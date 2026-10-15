const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const bathrooms = [
    {
      bathroomId: 101,
      bathroomName: "Robinson Hall",
      latitude: 39.71084367645474,
      longitude: -75.12028505092695,
      address: "201 Mullica Hill Road",
      description: "Restrooms on floors 1, 2, and 3.",
      image: "images/RobinsonHall.jpg",

      features: {
        accessible: true,
        changingTable: false,
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