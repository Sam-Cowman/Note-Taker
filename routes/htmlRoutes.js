
const path = require('path'); // Import path module
const router = require('express').Router(); // Create a new router object from Express

// Route to serve the notes.html file when the user visits /notes
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Route to serve the index.html file for all other routes
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router; // Export the router object
