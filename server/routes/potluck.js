const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// The router function just runs each function in sequence
//    1. Calls rejectUnauthenticated(req, res, next)
//    2. Calls (req, res) => {...}
router.get("/", rejectUnauthenticated, (req, res) => {
  // Checks to see if user is logged in
  console.log("Is authenticated:", req.isAuthenticated());
  // Identifies the logged in user
  console.log("User:", req.user);

  const queryString = `SELECT * FROM "food" WHERE id = $1`;

  pool
    .query(queryString, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

router.post("/", rejectUnauthenticated, (req, res) => {
  // Checks to see if user is logged in
  console.log("Is authenticated:", req.isAuthenticated());
  // Identifies the logged in user
  console.log("User:", req.user);

  const { name, type } = req.body;
  const queryString = `INSERT INTO "food" ("name", "type", "user_id") VALUES ($1, $2, $3);`;
  pool
    .query(queryString, [name, type, req.user.id])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

module.exports = router;
