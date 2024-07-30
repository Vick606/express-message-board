const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: false }));

// Sample messages array
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

// Index route
app.get('/', (req, res) => {
  res.render('index', { title: "Mini Messageboard", messages: messages });
});

// New message form route
app.get('/new', (req, res) => {
  res.render('form', { title: "New Message" });
});

// Handle new message submission
app.post('/new', (req, res) => {
  const { user, text } = req.body;
  messages.push({ text, user, added: new Date() });
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});