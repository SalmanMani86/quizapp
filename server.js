const express = require('express');
const cors = require('cors');
const jsonServer = require('json-server');

const app = express();
const router = jsonServer.router('db.json'); // Your db.json file
const middlewares = jsonServer.defaults();

app.use(cors());
app.use(middlewares);
app.use(jsonServer.rewriter({
  // Optional: you can rewrite routes here
}));
app.use(router);
app.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});
