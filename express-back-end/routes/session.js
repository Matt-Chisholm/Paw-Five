const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // router.get("/:name", (req, res) => {
  //   const dogName = req.params.name;
  //   db.query(`
  //     SELECT sessions.dog_id, sessions.description, sessions.timestamp, dogs.name, dogs.avatar
  //     FROM sessions
  //     JOIN dogs ON dogs.user_id = sessions.dog_id
  //     WHERE dogs.name = $1;
  //   `, [dogName])
  //     .then(result => {
  //       res.send(result.rows[0]);
  //     })
  //     .catch(err => console.log("error", err));
  // })

  router.post("/new", (req, res) => {
    console.log(req.body);
    const dog = req.body.dog;
    const skill = req.body.skill;
    const result = req.body.result;
    db.query(`
    INSERT INTO sessions 
    (dog_id, dog_name, skill_name, timestamp, result)
     VALUES (2, $1::text, $2::text, NOW()::timestamp, $3::text);;
    `, [dog, skill, result])
      .then(result => {
        res.send(result.rows[0]);
      })
      .catch(err => console.log("error", err));
  })
  return router;
};