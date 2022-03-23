// Route /api/home...
const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/users/image/:id", (req, res) =>{
    const userId = req.params.id;
    db.query(`
    `, [])
    .then()
    .catch()
  });

  return router;
};