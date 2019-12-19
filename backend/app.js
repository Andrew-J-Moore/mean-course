const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");

const app = express();

mongoose.connect("mongodb+srv://andrew:3KTjC5lZic8SoCaa@udemy-mean-njk9h.mongodb.net/udemy-mean?w=majority",
{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected');
  })
  .catch(() => {
    console.log('Connection Failed');
  });

app.use(bodyParser.json());
app.use("/uploads/images", express.static(path.join("backend/uploads/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.use("/api/posts",postRoutes);
app.use("/api/user", userRoutes)

module.exports = app;
