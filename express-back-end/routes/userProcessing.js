const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Route: /api/userProcessing/
  router.post("/register", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    db.query(`
      SELECT count(*)
      FROM users
      WHERE username = $1 OR email = $2;
    `, [username, email])
      .then(result => {
        console.log(result.rows[0]);
        if (result.rows[0].count == 0) {

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
        } else {
          res.send({id: -1});
        }
      })

  });

// router.get("/exist/check", (req, res) => {
//   const username = req.body.username;
//   const email = req.body.email;
//   db.query(`
//       SELECT count(*)
//       FROM users
//       WHERE username = $1 OR email = $2;
//     `, [username, email])
//     .then(result => {
//       res.send(result.rows[0]);
//       console.log(result.rows[0]);
//     })
// })



return router;
};