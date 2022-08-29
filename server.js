require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const contactRoutes = require("./routes/contacts");
const userRoutes = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/contacts", contactRoutes);
app.use("/api/user", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requsts
    app.listen(process.env.PORT || 5000, () => {
      console.log("connected to db");
    });
  })
  .catch((error) => {
    console.log(error);
  });
