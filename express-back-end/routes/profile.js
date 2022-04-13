const express = require('express');
const router = express.Router();

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
      SELECT skill_name as name, COUNT(*) as rating
      FROM sessions
      WHERE dog_id = $1
      GROUP BY skill_name;
    `, [dog_id])
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => console.log("error", err));
  });

  router.get("/sessions/:id", (req, res) => {
    const dog_id = req.params.id;
    db.query(`
      SELECT sessions.timestamp, sessions.result
      FROM sessions
      WHERE dog_id = $1;
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
          SELECT COUNT(DISTINCT skill_name)
          FROM sessions
          WHERE dog_id = $1;
        `, [dog_id])
          .then(result => {
            stats.skills = result.rows[0].count;
            db.query(`
              SELECT COUNT(*)
              FROM memuries
              JOIN dogs ON dogs.name = memuries.name
              WHERE dogs.id = $1;
        `, [dog_id])
              .then(result => {
                stats.memuries = result.rows[0].count;
                res.send(stats);
              })
          })
      })
      .catch(err => console.log("error", err));
  });


  router.post("/add-dog", (req, res) => {
    const name = req.body.name;
    const breed = req.body.breed;
    const photo = req.body.photo.length === 0 ? "https://static.vecteezy.com/system/resources/previews/005/055/092/original/cute-australian-shepherd-dog-avatar-cartoon-icon-illustration-vector.jpg" : req.body.photo;
    const user_id = req.body.user_id;
    db.query(`
          INSERT INTO dogs
          (name, breed, avatar, user_id)
          VALUES ($1, $2, $3, $4);
        `, [name, breed, photo, user_id])
      .then(result => {
        res.send(200);
      })
      .catch(err => console.log("error", err));
  });



  return router;
};