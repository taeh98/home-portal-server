const { MongoClient } = require('mongodb');

const MONGO_DB_PORT_NUMBER = 27017;
const url = `mongodb://${process.env.db_service_name}:${MONGO_DB_PORT_NUMBER}`;
const client = new MongoClient(url);
const SETTINGS_DB_NAME = "settings";

async function main() {
    console.log("connecting to mongodb");
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(SETTINGS_DB_NAME);
    const collection = db.collection('settings');

    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);

    const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
    console.log('Inserted documents =>', insertResult);

    return 'done.'
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close())