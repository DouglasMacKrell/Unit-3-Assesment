const express = require('express');
const router = express.Router();

const db = require('../db');

router.get("/", async (req, res) => {
  try {
    let getQuery = `
        SELECT *
        FROM researchers;
      `;
    let getAllResearchers = await db.any(getQuery)
    res.status(200).json({
      status: "success",
      message: "Avast! Researchers off the starboard side!",
      payload: getAllResearchers
    })
  } catch (error) {
    res.status(404).json({
      status: "error",
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
      status: "success",
      message: "Here's that one Researcher you asked for.",
      payload: getSingleResearcher
    })
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Oops! All Errors!"
    })
  }
})

router.post("/new", async (req, res) => {
  try {
    let insertQuery = `
    INSERT INTO researchers(name, job_title)
    VALUES ($1, $2)
    `;

    let addNewResearcher = await db.none(insertQuery, [req.body.name, req.body.job_title])

    res.status(201).json({
      status: "success",
      message: "New Researcher added!",
      payload: req.body
    })
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Oops! All Errors!"
    })
  }
})

router.patch("/:researcher_id", async (req, res) => {
  if (req.body.name) {
    try {
      let updateQuery = `
      UPDATE researchers
      SET name = $1
      WHERE researcher_id = $2 
      `;

      await db.none(updateQuery, [req.body.name, req.params.researcher_id])

      res.status(201).json({
        status: "success",
        message: "Name updated!"
      })
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Oops! All Errors!"
      })
    }
  } else {
    try {
      let updateQuery = `
      UPDATE researchers
      SET job_title = $1
      WHERE researcher_id = $2 
      `;

      await db.none(updateQuery, [req.body.job_title, parseInt(req.params.researcher_id)])

      res.status(201).json({
        status: "success",
        message: "Job Title updated!"
      })
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Oops! All Errors!"
      })
    }
  }
})

router.delete("/:researcher_id", async (req, res) => {
  try {
    let deleteQuery = `
   DELETE FROM researchers
   WHERE researcher_id = $1
   `;

    await db.none(deleteQuery, parseInt(req.params.researcher_id))

    res.status(200).json({
      status: "success",
      message: "Researcher deleted"
    })
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Oops! All Errors!"
    })
  }
})

module.exports = router;