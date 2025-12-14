const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

let adoptions = JSON.parse(fs.readFileSync("adoptions.json"));

// POST /adoptions
app.post("/adoptions", (req, res) => {
  adoptions.push({
    animalId: req.body.animalId,
    date: new Date()
  });

  fs.writeFileSync("adoptions.json", JSON.stringify(adoptions, null, 2));
  res.sendStatus(200);
});

app.listen(4000, () => console.log("Server B running"));
