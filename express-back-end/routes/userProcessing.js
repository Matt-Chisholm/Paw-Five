const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Route: /api/userProcessing/
  router.post("/register", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    db.query(`
      INSERT INTO users
      (username, email, password)
      VALUES ($1, $2, $3);
    `, [username, email, password])
      .then(result => {
        console.log("registration results:", result);
      })
      .catch(err => console.log("error", err));
  });



  return router;
};