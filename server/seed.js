require("dotenv").config();

const { MongoClient } = require("mongodb");
const bathrooms = require("./data/bathrooms");

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();

    const db = client.db(process.env.MONGODB_DB || "refinedrests");
    const collection = db.collection("bathrooms");

    await collection.createIndex({ bathroomId: 1 }, { unique: true });

    const result = await collection.bulkWrite(
      bathrooms.map((bathroom) => ({
        updateOne: {
          filter: { bathroomId: bathroom.bathroomId },
          update: { $setOnInsert: bathroom },
          upsert: true,
        },
      }))
    );

    console.log(`Inserted ${result.upsertedCount} restrooms.`);
  } finally {
    await client.close();
  }
}

seed().catch(() => {
  console.error("Seeding failed. Check your connection and database access.");
  process.exitCode = 1;
});