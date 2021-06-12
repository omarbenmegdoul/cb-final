const { MongoClient, Db } = require("mongodb");


require("dotenv").config();
const { MONGO_URI } = process.env;
const DB_NAME = "final_project";
let db;

function initMongoClient() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const client = new MongoClient(MONGO_URI, options);
  client.connect((err) => {
    if (err) {
      throw err;
    }
    db = client.db(DB_NAME);
  });
}
// const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));

module.exports= {initMongoClient, db:()=>db};