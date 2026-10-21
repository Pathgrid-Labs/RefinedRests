const { MongoClient } = require("mongodb");

let database;

async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing from server/.env");
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();

    database = client.db(process.env.MONGODB_DB || "refinedrests");
    await database.command({ ping: 1 });

    console.log("Connected to MongoDB");
  } catch (error) {
    await client.close();
    throw error;
  }
}

function getDB() {
  if (!database) {
    throw new Error("Database is not connected");
  }

  return database;
}

module.exports = { connectDB, getDB };