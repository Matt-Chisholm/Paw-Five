const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
const db = require('./database');
const fileUpload = require("express-fileupload");
const multer = require("multer");
const axios = require('axios');

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

App.use(fileUpload({}));

// const upload = multer({
//   limits: {
//     // 2 MB upload limit.  Should just fall under wit's 20-second limit
//     fileSize: 2 * 1024 * 1024,
//     files: 1 // 1 file
//   },
//   dest: 'uploads/'

const upload = multer({ dest: 'uploads/' })

App.post("/upload", upload.single("myfile"), (req, res) => {
  //extract the file from the request
  let upFile = req.files.myfile;
  console.log("file uploaded:");
  console.log(upFile);
  var buffer = upFile.data;

  const url = "https://api.wit.ai/speech";
  const witToken = process.env.WIT_serverAccessToken; //don't put your token inline

  axios
    .post(url, buffer, {
      headers: {
        Authorization: "Bearer " + witToken,
        "Content-Type": "audio/wav"
      }
    })

    .then(witResponse => {
      res.json(witResponse.data);
      return witResponse.data;
    })
    .then(res => {
      console.log("wit response: ", res); 
    })
    .catch(e => {
      console.log("error sending to wit: " + e);
      res.json({ error: e.message });
    });
});

const profileRoute = require("./routes/profile");
App.use("/api/profile", profileRoute(db));
const sessionsRoute = require("./routes/sessions");
App.use("/api/sessions", sessionsRoute(db));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.  log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
