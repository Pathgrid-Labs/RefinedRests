require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");

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

async function startServer() {
  try {
    await connectDB();

    const port = process.env.PORT || 3001;

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch {
    console.error(
      "Server startup failed. Check MongoDB credentials, network access, and configuration."
    );
    process.exitCode = 1;
  }
}

startServer();