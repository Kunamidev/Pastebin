const express = require('express');
const PastebinAPI = require('pastebin-js');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configure Pastebin API
const pastebin = new PastebinAPI({
  api_dev_key: 'LFhKGk5aRuRBII5zKZbbEpQjZzboWDp9',
  api_user_key: 'LFhKGk5aRuRBII5zKZbbEpQjZzboWDp9',
});

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Handle form submission and Pastebin upload
app.post('/upload', async (req, res) => {
  const { code } = req.body;

  try {
    const paste = await pastebin.createPaste({
      text: code,
      title: "Untitled",  // Default title since we're not asking for one
      format: null,
      privacy: 1,
    });

    const rawPaste = paste.replace("pastebin.com", "pastebin.com/raw");
    res.send(`Code uploaded to Pastebin: <a href="${rawPaste}" target="_blank">${rawPaste}</a>`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading the code to Pastebin!');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
