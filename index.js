import express from "express";

let items = [];
let categories = [
  { category: "Procesor" },
  { category: "Karta grafiki" },
  { category: "Pamięć RAM" },
  { category: "Peryferia" },
  { category: "Oprogramowanie" },
];

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
  next();
});

app.get("/items", (req, res) => {
  res.json(items);
});

app.get("/categories", (req, res) => {
  res.json(categories);
});

app.post("/addItem", (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).send("Created a position");
});

app.post("/addCategory", (req, res) => {
  const newCategory = req.body;
  categories.push(newCategory);
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

app.patch("/edit/:id", (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const updatedItem = items.find((item) => item.id === id);
  const updatedItemIndex = items.findIndex((item) => item.id === id);

  if (updatedItem) {
    items[updatedItemIndex] = {
      ...items[updatedItemIndex],
      ...update,
    };
    res.status(200).json(items[updatedItemIndex]);
  } else {
    res.status(404).send("Wskazana pozycja nie istnieje");
  }
});

app.post("/reorganise", (req, res) => {
  const reorganisedArray = req.body;
  items = reorganisedArray;
  res.status(201).send("Created a new array");
});

app.listen(3001, () => {
  console.log("Server is Running");
});
