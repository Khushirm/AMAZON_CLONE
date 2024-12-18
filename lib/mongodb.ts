import { MongoClient } from "mongodb";

const uri: string = process.env.MONGODB_URL as string;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URL) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
