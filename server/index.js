const express = require("express");
const morgan = require("morgan");
const { initMongoClient, db } = require("./db");
initMongoClient();
const {constructRequestFromFilterSummary} = require("./handlers")

const PORT = 5678;

var app = express();

app.use(express.json());
app.use(morgan("dev"));
// app.use(require("./routes"));
app.post("/listings", async (req, res) => {
  const body = req.body;
  console.log(`❗ index.js:16 'body'`,body);
  const mongoDBFilter = constructRequestFromFilterSummary(body.filterSummary);
  console.log(`❗ index.js:18 'mongDBFilter'`,mongoDBFilter);
  const listings = await db().collection("flattened_listings").find({...mongoDBFilter}).toArray();
  listings.slice(0,5).forEach(l=>{console.log(`❗ index.js:20 'l'`,l);});
  // console.log(`❗ index.js:15 'out'`,out);
  // res.status(200).json(listings)
  res.status(200).json(JSON.stringify({data:listings}));
});

app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Kijiji machine broke",
  });
})

const server = app.listen(PORT, function () {
  console.info("🌍 Listening on port " + server.address().port);
});