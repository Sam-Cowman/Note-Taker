// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Import route modules
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory

// Use the imported route modules
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
