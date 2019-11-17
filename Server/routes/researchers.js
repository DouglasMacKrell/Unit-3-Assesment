const express = require('express');
const router = express.Router();

// Database Connect
const db = require('../db');

router.get("/", async (req, res) => {
  try {
    let getQuery = `
        SELECT *
        FROM researchers;
      `;
    let getAllResearchers = await db.any(getQuery)
    res.status(200).json({
      payload: getAllResearchers,
      message: "Avast! Albums off the starboard side!"
    })
  } catch (error) {
    res.status(404).json({
      message: "Oops! All Errors!"
    })
  }
})

router.get("/:researcher_id", async (req, res) => {
  try {
    let researcher = parseInt(req.params.researcher_id)
    let getQuery = `
    SELECT *
    FROM researchers
    WHERE researcher_id = $1
    `;

    let getSingleResearcher = await db.any(getQuery, researcher)
    res.status(200).json({
      payload: getSingleResearcher,
      message: "Here's that one Researcher you asked for."
    })
  } catch (error) {
    res.status(500).json({
      message: "Oops! All Errors!"
    })
  }
})

router.post("/new_researcher", )

module.exports = router;