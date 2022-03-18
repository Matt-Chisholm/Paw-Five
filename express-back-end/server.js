const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8001;
const db = require('./database');

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

// Sample GET route
App.get('/api/data', (req, res) => {
  db.query('SELECT * FROM USERS;')
    .then( (x) =>  {
    console.log("response comma", x)
  })
});


App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
