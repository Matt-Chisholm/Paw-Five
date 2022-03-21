const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/:name", (req, res) => {
    const dogName = req.params.name;
    db.query(`
      SELECT sessions.dog_id, sessions.description, sessions.timestamp, dogs.name, dogs.avatar
      FROM sessions
      JOIN dogs ON dogs.user_id = sessions.dog_id
      WHERE dogs.name = $1;
    `, [dogName])
      .then(result => {
        res.send(result.rows[0]);
      })
      .catch(err => console.log("error", err));
  })
  return router;
};