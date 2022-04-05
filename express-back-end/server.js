// EXPRESS BACKEND

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

App.get('/cors', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send({ "msg": "This has CORS enabled 🎈" })
  })

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


App.get('/api/dog/:id', (req, res) => {
  db.query('SELECT * FROM DOGS WHERE DOGS.ID = $1 ;')
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

// tutorials
App.get('/api/tutorials', (req, res) => {
  db.query('SELECT * FROM TUTORIALS;')
    .then( (success) =>  {
    console.log("success api tutorials", success.rows);
    res.send(success.rows);
  })
  .catch( (err) => {
    console.log("error in api/tutorial: ", err);
  })
});

App.get('/api/tutorial/details/:id', (req, res) => {
  db.query('SELECT * FROM TUTORIALS WHERE id=$1;', [req.params.id])
    .then( (success) =>  {
    console.log("success api tutorials", success.rows);
    res.send(success.rows);
  })
  .catch( (err) => {
    console.log("error in api/tutorial: ", err);
  })
});

App.get('/latest', (req, res) => {
  db.query(
    `SELECT sessions.dog_name, sessions.result, sessions.timestamp, sessions.skill_name, dogs.avatar
  FROM sessions
  JOIN dogs ON dogs.id = sessions.dog_id
  ORDER BY sessions.timestamp DESC
  LIMIT 1;`
  )
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => console.log("error in newest", err));
});


App.use(fileUpload({}));

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
const sessionRoute = require("./routes/session");
App.use("/api/session", sessionRoute(db));
const homeRoute = require("./routes/home");
const { log } = require('node-wit');
App.use("/api/home", homeRoute(db));
const recorderRoute = require("./routes/recorder")
App.use("/api/recorder", recorderRoute(db));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.  log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
