const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Acess-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/posts", (req,res,next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "Post added successfully."
  });
});

app.get('/api/posts', (req,res,next) => {
  const posts = [
    {
      id: 'jklgjk',
      title: 'first server side post',
      content: 'this is from the server.'
    },
    {
      id: 'asdjkf',
      title: 'second server side post',
      content: 'this is from the server.'
    }
  ]
  res.status(200).json({
    message: 'Posts fetched successfully.',
    posts: posts
  });
});

module.exports = app;
