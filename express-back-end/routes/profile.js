const express = require('express');
const router  = express.Router();

module.exports = (db) => {
// Route: /api/profile/
  router.get("/dog/:id", (req, res) => {
    const user_id = req.params.id;
    db.query(`
      SELECT dogs.id, name, breed, avatar, username
      FROM dogs
      JOIN users ON dogs.user_id = users.id
      WHERE users.id = $1;
    `, [user_id])
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => console.log("error", err));
  });

  router.get("/skills/:id", (req, res) => {
    const dog_id = req.params.id;
    db.query(`
      SELECT skills.name, rating
      FROM skills
      JOIN dogs ON dogs.id = skills.dog_id
      WHERE dogs.id = $1;
    `, [dog_id])
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => console.log("error", err));
  });

  router.get("/dog/stats/:id", (req, res) => {
    const stats = {};
    const dog_id = req.params.id;
    db.query(`
      SELECT COUNT(*)
      FROM sessions
      WHERE dog_id = $1;
    `, [dog_id])
      .then(result => {
        stats.sessions = result.rows[0].count;
        db.query(`
          SELECT COUNT(*)
          FROM skills
          WHERE dog_id = $1;
        `, [dog_id])
          .then(result => {
            stats.skills = result.rows[0].count;
            res.send(stats);
          })
      })
      .catch(err => console.log("error", err));
  });



  return router;
};