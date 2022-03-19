const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
const db = require('./database');

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

// USERS GET route, get all users
App.get('/api/users', (req, res) => {
  db.query('SELECT * FROM USERS;')
    .then( (x) =>  {
    res.send(x.rows);
  })
  .catch( (err) => {
    console.log(err);
  })
});

App.get('/api/dogs', (req, res) => {
  db.query('SELECT * FROM DOGS;')
    .then( (x) =>  {
    res.send(x.rows);
  })
  .catch( (err) => {
    console.log(err);
  })
});

App.get('/api/skills', (req, res) => {
  db.query('SELECT * FROM SKILLS;')
    .then( (x) =>  {
    res.send(x.rows);
  })
  .catch( (err) => {
    console.log(err);
  })
});

App.get('/api/sessions', (req, res) => {
  db.query('SELECT * FROM SESSIONS;')
    .then( (x) =>  {
    res.send(x.rows);
  })
  .catch( (err) => {
    console.log(err);
  })
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
