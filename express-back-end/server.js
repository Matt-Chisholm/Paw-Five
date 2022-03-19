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

const upload = multer({
  limits: {
    // 2 MB upload limit.  Should just fall under wit's 20-second limit
    fileSize: 2 * 1024 * 1024,
    files: 1 // 1 file
  }
});

App.post("/upload", upload.single("myfile"), (req, res) => {
  //extract the file from the request
  console.log(req.body);
  // let upFile = req.files.myfile;
  // console.log("file uploaded:");
  // console.log(upFile);
  // var buffer = upFile.data;

  // const url = "https://api.wit.ai/speech";
  // const witToken = "5H7ZWJM2C7Q6AJAKZO3DQTHCQSLJE7Z7"; //don't put your token inline

  // axios
  //   .post(url, buffer, {
  //     headers: {
  //       Authorization: "Bearer " + witToken,
  //       "Content-Type": "audio/wav"
  //     }
  //   })

  //   .then(witResponse => {
  //     console.log("wit response: " + JSON.stringify(witResponse.data));
  //     res.json(witResponse.data);
  //   })

  //   .catch(e => {
  //     console.log("error sending to wit: " + e);
  //     res.json({ error: e.message });
  //   });
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
