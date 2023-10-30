// db.js
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://gogreneinfo:cat89boy@cluster0.pwt69y1.mongodb.net/?retryWrites=true&w=majority';

let client;

if (!client) {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export async function connectToDatabase() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db();
}
