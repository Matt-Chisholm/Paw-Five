// Route: /api/recorder...
const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  
  // make a call to wit.ai
  router.get("/test", (req, res) => {
    console.log("Call route success");

    const q = encodeURIComponent('sit');
    const uri = 'https://api.wit.ai/message?v=20210928&q=' + q;
    const auth = 'Bearer ' + process.env.REACT_APP_WIT_clientAccessToken;
    fetch(uri, {headers: {Authorization: auth, method: 'GET'}})
      .then(res => {
        console.log("recorder success", res.body)            
        res.json()
        return res;
      })
      .then(res => console.log(res))
      .catch(err => console.log("err", err))
    })
    


    "https://api.wit.ai/message?v=20210928&q=birdie%20sit"
  return router;

}

