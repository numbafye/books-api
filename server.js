// DEPENDENCIES
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// CONFIG/MIDDLEWARE
require("dotenv").config();
const PORT = process.env.PORT || 3000; // Providing a default value in case PORT is not defined
app.use(express.json());
app.use(cors());

// MONGOOSE
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// ROOT INDEX
app.get("/", (req, res) => {
  res.send("Hello World");
});

// BOOKS
const booksController = require("./controllers/books_controller");
app.use("/books", booksController);

// LISTEN
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
