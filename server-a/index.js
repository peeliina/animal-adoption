const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

// CORS – sallitaan frontendin kutsut
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  next();
});

// Ladataan eläimet
let animals = JSON.parse(fs.readFileSync("animals.json"));

// GET /animals
app.get("/animals", (req, res) => {
  res.json(animals.filter(a => a.status === "available"));
});

// GET /animals/:id
app.get("/animals/:id", (req, res) => {
  const animal = animals.find(a => a.id == req.params.id);
  res.json(animal);
});

// POST /animals/:id/adopt
app.post("/animals/:id/adopt", async (req, res) => {
  const animal = animals.find(a => a.id == req.params.id);

  if (!animal || animal.status === "adopted") {
    return res.status(400).send("Already adopted");
  }

  await fetch("http://server-b:4000/adoptions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ animalId: animal.id })
  });

  animal.status = "adopted";
  fs.writeFileSync("animals.json", JSON.stringify(animals, null, 2));

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Server A running on port 3000");
});
