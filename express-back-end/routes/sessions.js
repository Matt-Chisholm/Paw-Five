const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // Route: /api/profile/
    router.get("/:id", (req, res) => {
      const user_id = req.params.id;
      db.query(`
        SELECT dogs.avatar, dogs.name, sessions.description, sessions.timestamp
        FROM dogs
        JOIN sessions ON dogs.id = sessions.dog_id
        WHERE dogs.user_id = $1;
      `, [user_id])
        .then(result => {
          res.send(result.rows[0]);
        })
        .catch(err => console.log("error", err));
    });

    return router;

  };