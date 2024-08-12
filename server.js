const express = require('express');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const app = express();


// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// Middleware to include header and footer
app.use((req, res, next) => {
  res.locals.header = fs.readFileSync(path.join(__dirname, 'views', 'header.ejs'), 'utf8');
  res.locals.footer = fs.readFileSync(path.join(__dirname, 'views', 'footer.ejs'), 'utf8');
  next();
});

// Routes to serve static HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Q8HomePage.html'));
});

app.get('/browse', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Q8Browse.html'));
});

app.get('/privacy', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Q8privacy.html'));
});

app.get('/giveaway', (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, 'public', 'Q8Giveaway.html'));
  } else {
    res.redirect('/login');
  }
});

app.get('/findpets', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Q8FindPets.html'));
});

app.get('/dogcare', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Q8DogCare.html'));
});

app.get('/catcare', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Q8CatCare.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Q8Contact.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error logging out.');
    }
    res.render('layout', { title: 'Logout', content: '<h1>You have been logged out successfully.</h1>' });
  });
});

// Route to handle user registration
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Validate username and password format
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

  if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
    return res.send('Invalid username or password format.');
  }

  // Read existing users
  const usersFilePath = path.join(__dirname, 'users.json');
  let users = {};

  if (fs.existsSync(usersFilePath)) {
    users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  }

  // Check if the username already exists
  if (users[username]) {
    return res.send('Username already exists. Please choose another one.');
  }

  // Add new user and save to file
  users[username] = password;
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  res.send('Account created successfully. You can now log in.');
});

// Route to handle user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate username and password format
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

  if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
    return res.send('Invalid username or password format.');
  }

  // Read existing users
  const usersFilePath = path.join(__dirname, 'users.json');
  if (!fs.existsSync(usersFilePath)) {
    return res.send('No users found.');
  }

  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

  // Check if the username and password match
  if (users[username] === password) {
    req.session.user = username;
    res.redirect('/Q8Givaway.html');
  } else {
    res.send('Invalid username or password.');
  }
});

// Route to handle pet submission
app.post('/Q8Givaway.html', (req, res) => {
  if (!req.session.user) {
    return res.status(403).send('You must be logged in to submit a pet.');
  }

  const { type, breed, age, gender } = req.body;
  const petData = `${Date.now()}:${req.session.user}:${type}:${breed}:${age}:${gender}`;

  fs.appendFile(path.join(__dirname, 'data', 'pets.txt'), petData + '\n', (err) => {
    if (err) {
      return res.status(500).send('Error saving pet information.');
    }

    res.send('Pet information submitted successfully.');
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
