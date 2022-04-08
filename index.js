import express from "express";

let items = [];

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/add", (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).send("Created a position");
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const deleted = items.find((item) => item.id === id);

  if (deleted) {
    items = items.filter((item) => item.id !== id);
    res.status(200).json(deleted);
  } else {
    res.status(404).send("Wskazana pozycja nie istnieje");
  }
});

app.listen(3001, () => {
  console.log("Server is Running");
});
