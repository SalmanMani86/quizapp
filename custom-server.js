const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json')); // point to your db.json
const middlewares = jsonServer.defaults();

// CORS options
const corsOptions = {
  origin: 'http://localhost:8080', // Update to match your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true, // Enable sending cookies and authorization headers
};

// Use CORS middleware
server.use(cors(corsOptions));
server.use(middlewares);

// Add custom routes or middleware if needed
server.use(router);

// Start the server
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
