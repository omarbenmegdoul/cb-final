const express = require("express");
const morgan = require("morgan");
const { initMongoClient, db } = require("./db");
initMongoClient();

const PORT = 5678;

var app = express();

app.use(express.json());
app.use(morgan("dev"));
// app.use(require("./routes"));
app.get("/test", async (req, res) => {
  const out = await db().collection("just_cntxt").find({}).toArray();
  // console.log(`❗ index.js:15 'out'`,out);
  res.status(200).json(out)
});

app.get("/api/filteredListings", async (req, res) => {
  const out = await db().collection("just_cntxt").find({}).toArray();
  


  res.status(200).json("")
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