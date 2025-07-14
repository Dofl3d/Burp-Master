const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const FLAG = "DUCA{burp_was_the_key}";
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BurpMaster</title>
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <h2>Welcome to BurpMaster</h2>
    <p>Try harder.</p>
    <form action="/login" method="get" style="margin-top:32px;">
      <button type="submit">Login</button>
    </form>
  </body>
  </html>`);
});

app.get('/login', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login - BurpMaster</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <h3>Login</h3>
      <form method="POST">
        <input name="username" placeholder="Username"><br>
        <input name="password" type="password" placeholder="Password"><br>
        <button type="submit">Login</button>
      </form>
    </body>
    </html>
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
