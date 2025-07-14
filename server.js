const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const FLAG = "DUCA{burp_was_the_key}";
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`<h2>Welcome to BurpMaster</h2><p>Try harder.</p>`);
});

app.get('/login', (req, res) => {
  res.send(`
    <h3>Login</h3>
    <form method="POST">
      <input name="username" placeholder="Username"><br>
      <input name="password" type="password" placeholder="Password"><br>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
  res.send("Invalid credentials.");
});

app.post('/super-admin', (req, res) => {
  const debug = req.query.debug;
  const header = req.header('X-Admin');
  if (debug === 'true' && header === 'true') {
    res.send(`Flag: ${FLAG}`);
  } else {
    res.status(403).send("Forbidden.");
  }
});

app.all('/api', (req, res) => {
  res.send("Try a different endpoint.");
});

app.listen(PORT, () => {
  console.log(`Challenge running at http://localhost:${PORT}`);
});
