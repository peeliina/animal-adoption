const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

// Antaa adoptiotietojen muuttaa adoptions-tiedostoa
let adoptions = JSON.parse(fs.readFileSync("adoptions.json"));

// Vastaanotetaan adoptiohakemukset Server-A:lta
app.post("/adoptions", (req, res) => {
  // Lisätään adoptio listaan
  adoptions.push({
    animalId: req.body.animalId,
    date: new Date()
  });

  // Tallentaa adoptiot tiedostoon
  fs.writeFileSync("adoptions.json", JSON.stringify(adoptions, null, 2));
  res.sendStatus(200);
});

app.listen(4000, () => console.log("Server B running"));
