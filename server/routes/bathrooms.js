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
        },

        {
          rating: 3,
          cleanliness: 3,
          privacy: 4,
          comment: "Smells a bit, but otherwise okay."
        },
      ]
    },

    {
      bathroomId: 102,
      bathroomName: "Science Hall",
      latitude: 39.709972,
      longitude: -75.120417,
      address: "230 Meditation Walk, Glassboro, NJ 08028",
      description: "Restrooms on floors 1, 2, and 3.",
      image: "images/ScienceHall.jpg",

      features: {
        accessible: true,
        changingTable: false,
      },

      reviews: [
        {
          rating: 4,
          cleanliness: 4.5,
          privacy: 5,
          comment: "Clean and well-maintained."
        },

        {
          rating: 5,
          cleanliness: 5,
          privacy: 5,
          comment: "Best bathroom on campus."
        }
      ]
    },

    {
      bathroomId: 103,
      bathroomName: "Savitz Hall",
      latitude: 39.71084367645474,
      longitude: -75.12028505092695,
      address: "227 Mullica Hill Road, Glassboro, NJ 08028",
      description: "Restrooms on floors 1, 2, and 3.",
      image: "images/SavitzHall.jpg",

      features: {
        accessible: true,
        changingTable: false,
      },

      reviews: [
        {
          rating: 3,
          cleanliness: 2,
          privacy: 3,
          comment: "Needs improvement."
        },

        {
          rating: 4,
          cleanliness: 4,
          privacy: 5,
          comment: "Good bathroom overall."
        },

        {
          rating: 4,
          cleanliness: 3,
          privacy: 5,
          comment: "Gets the job done, but could be cleaner." 
        }
      ]
    },

  ];

  res.json(bathrooms);
});

module.exports = router;