const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Sample messages array
const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    id: 2,
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
  const id = messages.length + 1;
  messages.push({ id, text, user, added: new Date() });
  res.redirect('/');
});

// Message details route
app.get('/message/:id', (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = messages.find(m => m.id === messageId);
  if (message) {
    res.render('message', { title: "Message Details", message });
  } else {
    res.status(404).send('Message not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});