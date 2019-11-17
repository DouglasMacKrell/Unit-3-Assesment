const express = require('express');
const router = express.Router();

const db = require('../db');

router.get("/", async (req, res) => {
    try {
        let getQuery = `
        SELECT *
        FROM habitats
        `;

        let getAllHabitats = await db.any(getQuery)

        res.status(200).json({
            status: "success",
            message: "Whoa! That's a LOT of habitats!",
            payload: getAllHabitats
        })
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: "Oops! All Errors!"
        })
    }
})

router.get("/:habitat_id", async (req, res) => {
    try {
        let habitat = parseInt(req.params.habitat_id)
        let getQuery = `
        SELECT *
        FROM habitats
        WHERE habitat_id = $1
        `;

        let getSingleHabitat = await db.any(getQuery, habitat)
        res.status(200).json({
            status: "success",
            message: "Here's that one habitat you asked for.",
            payload: getSingleHabitat
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
      INSERT INTO habitats(category)
      VALUES ($1)
      `;

        await db.none(insertQuery, req.body.category)

        res.status(201).json({
            status: "success",
            message: "New habitat added!",
            payload: req.body
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Oops! All Errors!"
        })
    }
})

module.exports = router;