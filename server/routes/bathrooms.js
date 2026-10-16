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
          comment: "Best bathroom on campus!"
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

    {
      bathroomId: 104,
      bathroomName: "Business Hall",
      latitude: 39.70827,
      longitude: -75.11827,
      address: "201 Mullica Hill Road, Glassboro, NJ 08028",
      description: "Restrooms on floors 1, 2, and 3.",
      image: "images/BusinessHall.jpg",

      features: {
        accessible: true,
        changingTable: false,
      },

      reviews: [
        {
          rating: 5,
          cleanliness: 5,
          privacy: 5,
          comment: "Excellent bathroom!"
        },

        {
          rating: 4.5,
          cleanliness: 4,
          privacy: 5,
          comment: "Good bathroom overall but the trash can was full."
        },

        {
          rating: 3,
          cleanliness: 3,
          privacy: 5,
          comment: "Toilet was clogged, but otherwise okay." 
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

      features: {
        accessible: true,
        changingTable: false,
      },

      reviews: [
        {
          rating: 2,
          cleanliness: 1,
          privacy: 3,
          comment: "Could use some cleaning."
        },

        {
          rating: 3.5,
          cleanliness: 3,
          privacy: 5,
          comment: "Floors were wet and slippery, but otherwise okay."
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

      features: {
        accessible: true,
        changingTable: false,
      },

      reviews: [
        {
          rating: 3,
          cleanliness: 3,
          privacy: 4,
          comment: "Decent bathroom"
        },

        {
          rating: 4,
          cleanliness: 3,
          privacy: 5,
          comment: "Not bad, but could be cleaner."
        },

        {
          rating: 3,
          cleanliness: 3,
          privacy: 4,
          comment: "Not the best bathroom, but it works." 
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

      features: {
        accessible: true,
        changingTable: false,
      },

      reviews: [
        {
          rating: 4.5,
          cleanliness: 4,
          privacy: 4,
          comment: "Good bathroom overall."
        },

        {
          rating: 5,
          cleanliness: 5,
          privacy: 5,
          comment: "Excellent bathroom!"
        },

        {
          rating: 3.5,
          cleanliness: 4,
          privacy: 4,
          comment: "Not bad, but could be cleaner." 
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

      features: {
        accessible: true,
        changingTable: false,
      },

      reviews: [
        {
          rating: 1,
          cleanliness: 2,
          privacy: 3,
          comment: "Needs maintenance and cleaning."
        },

        {
          rating: 2,
          cleanliness: 1,
          privacy: 2,
          comment: "Worst bathroom on campus."
        },

        {
          rating: 3,
          cleanliness: 3,
          privacy: 4,
          comment: "Not the best bathroom, but it works." 
        },

        {
          rating: 3,
          cleanliness: 2,
          privacy: 4,
          comment: "very smelly and dirty, needs to be cleaned more often." 
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

      features: {
        accessible: true,
        changingTable: false,
      },

      reviews: [
        {
          rating: 4,
          cleanliness: 5,
          privacy: 4,
          comment: "Good bathroom."
        },

        {
          rating: 2,
          cleanliness: 2,
          privacy: 4,
          comment: "Needs more cleaning!!"
        },

        {
          rating: 5,
          cleanliness: 5,
          privacy: 5,
          comment: "No complaints, very clean."
        },

        {
          rating: 4.5,
          cleanliness: 4,
          privacy: 4,
          comment: "Good bathroom overall."
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

      features: {
        accessible: true,
        changingTable: false,
      },

      reviews: [
        {
          rating: 4.5,
          cleanliness: 4,
          privacy: 5,
          comment: "Cleanest bathroom on campus."
        },

        {
          rating: 5,
          cleanliness: 5,
          privacy: 5,
          comment: "Excellent bathroom!"
        },

        {
          rating: 4,
          cleanliness: 4,
          privacy: 4,
          comment: "The water was not working properly." 
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

      features: {
        accessible: true,
        changingTable: false,
      },

      reviews: [
        {
          rating: 4.5,
          cleanliness: 4,
          privacy: 5,
          comment: "Cleanest bathroom on campus."
        },

        {
          rating: 5,
          cleanliness: 5,
          privacy: 5,
          comment: "Excellent bathroom!"
        },

        {
          rating: 4,
          cleanliness: 4,
          privacy: 4,
          comment: "The water was not working properly." 
        }
      ]
    },
  ];

  res.json(bathrooms);
});

module.exports = router;