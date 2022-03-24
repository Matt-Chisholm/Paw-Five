const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/:name/:id", (req, res) => {
    const dogName = req.params.name;
    const dogID = req.params.id;
    db.query(`
      SELECT sessions.dog_name, sessions.result, sessions.timestamp, sessions.skill_name, dogs.avatar
      FROM sessions
      JOIN dogs ON dogs.id = sessions.dog_id
      WHERE sessions.dog_name = $1 AND dogs.id = $2;
    `, [dogName, dogID])
      .then(result => {
        console.log(result.rows);
        res.send(result.rows);
      })
      .catch(err => console.log("error", err));
  })

  router.get("/:name", (req, res) => {
    const dogName = req.params.name;
    db.query(`
      SELECT dogs.id
      FROM dogs
      WHERE dogs.name = $1;
    `, [dogName])
      .then(result => {
        console.log(result.rows);
        res.send(result.rows);
      })
      .catch(err => console.log("error", err));
  })

  router.post("/new", (req, res) => {
    console.log(req.body);
    const dog = req.body.dog;
    const skill = req.body.skill;
    const result = req.body.result;
    const dogID = req.body.id;
    db.query(`
    INSERT INTO sessions 
    (dog_id, dog_name, skill_name, timestamp, result)
     VALUES ($1, $2::text, $3::text, NOW()::timestamp, $4::text);
    `, [dogID, dog, skill, result])
      .then(result => {
        res.send(result.rows[0]);
      })
      .catch(err => console.log("error", err));
  })
  return router;
};