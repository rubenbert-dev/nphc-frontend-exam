import { MongoClient } from "mongodb";

global.mongo = global.mongo || {};

const uri = process.env.MONGODB_URI
const options = {}

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

let indexesCreated = false;
async function createIndexes(db) {
    await Promise.all([
        db.collection('employees')
        .createIndexes([{ key: { createdAt: -1 } }, { key: { _id: 1 } }]),
    ]);

    indexesCreated = true;
}

export async function getMongoClient() {
    if (!global.mongo.client) {
        global.mongo.client = new MongoClient(uri, options);
    }

    await global.mongo.client.connect();
    return global.mongo.client;
}

export default async function database(req, res, next) {
    if (!global.mongo.client) {
        global.mongo.client = new MongoClient(uri, options);
    }

    req.dbClient = await getMongoClient();
    req.db = req.dbClient.db("nphc_db");

    if (!indexesCreated) await createIndexes(req.db);

    return next();
}