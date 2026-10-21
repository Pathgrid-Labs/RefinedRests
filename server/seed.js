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

    let insertedCount = 0;

    for (const bathroom of bathrooms) {
      const existingBathroom = await collection.findOne({
        bathroomId: bathroom.bathroomId
      });

      if (!existingBathroom) {
        await collection.insertOne(bathroom);
        insertedCount = insertedCount + 1;
      }
    }

    console.log("Inserted " + insertedCount + " restrooms.");
  } finally {
    await client.close();
  }
}

seed().catch(() => {
  console.error("Seeding failed. Check your connection and database access.");
  process.exitCode = 1;
});
