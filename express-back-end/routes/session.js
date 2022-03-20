const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/:id", (req, res) => {
    const user_id = req.params.id;
    db.query(`
      SELECT sessions.dog_id, sessions.description, sessions.timestamp, dogs.name, dogs.avatar
      FROM sessions
      JOIN dogs ON dogs.user_id = sessions.dog_id
      WHERE sessions.dog_id = $1;
    `, [user_id])
      .then(result => {
        res.send(result.rows[0]);
      })
      .catch(err => console.log("error", err));
  })
  return router;
};