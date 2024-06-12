// routes/apiroutes.js
const fs = require('fs'); // Import file system module
const path = require('path'); // Import path module
const router = require('express').Router(); // Create a new router object from Express

// Function to generate a unique ID for each note
const generateUniqueId = () => {
  return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// API route to get all notes
router.get('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes' });
    }
    res.json(JSON.parse(data)); // Parse and send notes data as JSON
  });
});

// API route to create a new note
router.post('/notes', (req, res) => {
  const newNote = { ...req.body, id: generateUniqueId() }; // Create a new note object with a unique ID
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes' });
    }
    const notes = JSON.parse(data);
    notes.push(newNote); // Add the new note to the notes array
    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to save note' });
      }
      res.json(newNote); // Return the new note as JSON
    });
  });
});

// API route to delete a note
router.delete('/notes/:id', (req, res) => {
  const { id } = req.params; // Extract note ID from request parameters
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes' });
    }
    const notes = JSON.parse(data);
    const updatedNotes = notes.filter(note => note.id !== id); // Remove the note with the specified ID
    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(updatedNotes, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to delete note' });
      }
      res.json({ message: 'Note deleted successfully' }); // Send success message
    });
  });
});

module.exports = router; // Export the router object
