const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());
app.use(cors());

const allComments = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(allComments[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = allComments[req.params.id] || [];

  comments.push({ id: commentId, content });

  allComments[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log('Listening on port 4001...');
});