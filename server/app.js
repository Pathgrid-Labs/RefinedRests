require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const bathroomRoutes = require("./routes/bathrooms");

app.use(cors({
  origin: [
    "http://localhost:5500",
    "http://127.0.0.1:5500"
  ]
}));

app.use(express.json());

app.use("/api/bathrooms", bathroomRoutes);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});