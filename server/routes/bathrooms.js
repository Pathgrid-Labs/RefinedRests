const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const bathrooms = [
    {
      bathroomId: 101,
      bathroomName: "Robinson Hall",
      latitude: 39.71084367645474,
      longitude: -75.12028505092695,
      address: "201 Mullica Hill Road, Glassboro, NJ 08028",
      description: "Restrooms on floors 1, 2, and 3.",
      image: "images/RobinsonHall.jpg",

      tags: ["Old","Clean", "Accessible", "Urinals", "Stalls"],

      features: {
        accessible: true,
        changingTable: false,
      },

      reviews: [
        {
          rating: 5,
          cleanliness: 5,
          privacy: 4
        },

        {
          rating: 4,
          cleanliness: 4,
          privacy: 5
        },

        {
          rating: 3,
          cleanliness: 3,
          privacy: 4
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

      tags: ["Clean", "Accessible", "Urinals", "Stalls"],

      features: {
        accessible: true,
        changingTable: false,
      },

      reviews: [
        {
          rating: 4,
          cleanliness: 4.5,
          privacy: 5
        },

        {
          rating: 5,
          cleanliness: 5,
          privacy: 5
        }
      ]
    },

    {
      bathroomId: 103,
      bathroomName: "Savitz Hall",
      latitude: 39.70881,
      longitude: -75.11999,
      address: "227 Mullica Hill Road, Glassboro, NJ 08028",
      description: "Restrooms on floors 1, 2, and 3.",
      image: "images/SavitzHall.jpg",

      tags: ["Old", "Clean", "Accessible", "Urinals", "Stalls"],

      features: {
        accessible: true,
        changingTable: false,
      },

      reviews: [
        {
          rating: 3,
          cleanliness: 2,
          privacy: 3
        },

        {
          rating: 4,
          cleanliness: 4,
          privacy: 5
        },

        {
          rating: 4,
          cleanliness: 3,
          privacy: 5
        }
      ]
    },

    {
      bathroomId: 104,
      bathroomName: "Business Hall",
      latitude: 39.70827,
      longitude: -75.11827,
      address: "201 Mullica Hill Road, Glassboro, NJ 08028",
      description: "Restrooms on floors 1, 2, and 3.",
      image: "images/BusinessHall.jpg",

      tags: ["Modern","Clean", "Accessible", "Urinals", "Stalls"],

      features: {
        accessible: true,
        changingTable: false,
      },

      reviews: [
        {
          rating: 5,
          cleanliness: 5,
          privacy: 5
        },

        {
          rating: 4.5,
          cleanliness: 4,
          privacy: 5
        },

        {
          rating: 3,
          cleanliness: 3,
          privacy: 5
        }
      ]
    },

    {
      bathroomId: 105,
      bathroomName: "Hawthorn Hall",
      latitude: 39.70863,
      longitude: -75.12098,
      address: "350 Memorial Circle, Glassboro, NJ 08028",
      description: "Restrooms on floors 1, 2, and 3.",
      image: "images/HawthornHall.jpg",

      tags: ["Old","Clean", "Accessible", "Urinals", "Stalls"],

      features: {
        accessible: true,
        changingTable: false,
      },

      reviews: [
        {
          rating: 2,
          cleanliness: 1,
          privacy: 3
        },

        {
          rating: 3.5,
          cleanliness: 3,
          privacy: 5
        },

      ]
    },

    {
      bathroomId: 106,
      bathroomName: "Westby Hall",
      latitude: 39.71001,
      longitude: -75.12194,
      address: "237 Mullica Hill Road, Glassboro, NJ 08028",
      description: "Restrooms on floors 1 and 2.",
      image: "images/WestbyHall.jpg",
      
      tags: ["Clean", "Accessible", "Urinals", "Stalls"],
      features: {
        accessible: true,
        changingTable: false,
      },

      reviews: [
        {
          rating: 3,
          cleanliness: 3,
          privacy: 4
        },

        {
          rating: 4,
          cleanliness: 3,
          privacy: 5
        },

        {
          rating: 3,
          cleanliness: 3,
          privacy: 4
        }
      ]
    },

    {
      bathroomId: 107,
      bathroomName: "James Hall",
      latitude: 39.71138,
      longitude: -75.11961,
      address: "445 North Campus Drive, Glassboro, NJ 08028",
      description: "Restrooms on floors 1, 2, and 3.",
      image: "images/JamesHall.jpg",

      tags: ["Clean", "Accessible", "Urinals", "Stalls"],

      features: {
        accessible: true,
        changingTable: false,
      },

      reviews: [
        {
          rating: 4.5,
          cleanliness: 4,
          privacy: 4
        },

        {
          rating: 5,
          cleanliness: 5,
          privacy: 5
        },

        {
          rating: 3.5,
          cleanliness: 4,
          privacy: 4
        }
      ]
    },

    {
      bathroomId: 108,
      bathroomName: "Bunce Hall",
      latitude: 39.707468,
      longitude: -75.120632,
      address: "237 Mullica Hill Road, Glassboro, NJ 08028",
      description: "Restrooms on floors 1 and 2, and 3.",
      image: "images/BunceHall.jpg",

      tags: ["Old","Clean", "Accessible", "Urinals", "Stalls"],
      
      features: {
        accessible: true,
        changingTable: false,
      },

      reviews: [
        {
          rating: 1,
          cleanliness: 2,
          privacy: 3
        },

        {
          rating: 2,
          cleanliness: 1,
          privacy: 2
        },

        {
          rating: 3,
          cleanliness: 3,
          privacy: 4
        },

        {
          rating: 3,
          cleanliness: 2,
          privacy: 4
        }
      ]
    },

    {
      bathroomId: 109,
      bathroomName: "Campbell Library",
      latitude: 39.70859,
      longitude: -75.11926,
      address: "215 Mullica Hill Rd, Glassboro, NJ 08028",
      description: "Restrooms on floors 1 and 2, 3, 4, and 5.",
      image: "images/CampbellLibrary.jpg",

      tags: ["Clean", "Accessible", "Urinals", "Stalls"],

      features: {
        accessible: true,
        changingTable: false,
      },

      reviews: [
        {
          rating: 4,
          cleanliness: 5,
          privacy: 4
        },

        {
          rating: 2,
          cleanliness: 2,
          privacy: 4
        },

        {
          rating: 5,
          cleanliness: 5,
          privacy: 5
        },

        {
          rating: 4.5,
          cleanliness: 4,
          privacy: 4
        },

      ]
    },

    {
      bathroomId: 110,
      bathroomName: "Discovery Hall",
      latitude: 39.70731,
      longitude: -75.11523,
      address: "53 Mullica Hill Rd, Glassboro, NJ 08028",
      description: "Restrooms on floors 1 and 2,3 and 4.",
      image: "images/DiscoveryHall.jpg",

      tags: ["Modern", "Clean", "Accessible", "Urinals", "Stalls"],
      
      features: {
        accessible: true,
        changingTable: false,
      },

      reviews: [
        {
          rating: 4.5,
          cleanliness: 4,
          privacy: 5
        },

        {
          rating: 5,
          cleanliness: 5,
          privacy: 5
        },

        {
          rating: 4,
          cleanliness: 4,
          privacy: 4
        }
      ]
    },

    {
      bathroomId: 111,
      bathroomName: "Chamberlain Student Center",
      latitude: 39.708401,
      longitude: -75.118005,
      address: "201 Mullica Hill Rd, Glassboro, NJ 08028",
      description: "Restrooms on floors 1 and 2 and 3.",
      image: "images/ChamberlainStudentCenter.jpg",

      tags: ["Clean", "Accessible", "Urinals", "Stalls"],

      features: {
        accessible: true,
        changingTable: false,
      },

      reviews: [
        {
          rating: 4.5,
          cleanliness: 4,
          privacy: 5
        },

        {
          rating: 5,
          cleanliness: 5,
          privacy: 5
        },

        {
          rating: 4,
          cleanliness: 4,
          privacy: 4
        }
      ]
    },
  ];

  res.json(bathrooms);
});

module.exports = router;