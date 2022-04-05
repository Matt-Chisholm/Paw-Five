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
      (username, email, password, image)
      VALUES ($1, $2, $3, 'https://media.discordapp.net/attachments/952978925259206699/956228105884799046/avatar-test_1.jpeg')
      RETURNING id;
    `, [username, email, password])
      .then(result => {
        res.send(result.rows[0]);
      })
      .catch(err => console.log("error", err));
  });



  return router;
};