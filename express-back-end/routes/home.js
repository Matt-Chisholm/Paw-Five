// Route /api/home...
const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // test route
  router.get("/", (req, res) => {
    db.query(`
      SELECT * 
      FROM users;
    `)
    .then(result => {
      res.send(result)
    })
    .catch(error =>{
      res.send(error)
    })
  });

  // 
  router.get("/users/image/:id", (req, res) =>{
    const userId = req.params.id;
    db.query(`
      SELECT image 
      FROM users
      WHERE users.id = $1;
    `, [userId])
    .then(result => {
      res.send(result.rows)
      console.log("query", result);
    })
    .catch(error => {
      console.log("query error", error);
      res.send(error)
    })
  });

  return router;
};