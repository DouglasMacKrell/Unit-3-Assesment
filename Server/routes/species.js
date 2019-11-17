const express = require('express');
const router = express.Router();

const db = require('../db');

router.get("/", async (req, res) => {
    try {
      let getQuery = `
          SELECT *
          FROM species;
        `;
      let getAllSpecies = await db.any(getQuery)
      res.status(200).json({
        status: "success",
        message: "Yo HO! Species in abundance!",
        payload: getAllSpecies
      })
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: "Oops! All Errors!"
      })
    }
})

router.get("/:species_id", async (req, res) => {
    try {
      let species = parseInt(req.params.species_id)
      let getQuery = `
      SELECT *
      FROM species
      WHERE species_id = $1
      `;
  
      let getSingleSpecies = await db.any(getQuery, species)
      res.status(200).json({
        status: "success",
        message: "Here's that one Species you asked for.",
        payload: getSingleSpecies
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
      INSERT INTO species(species_name, is_mammal)
      VALUES ($1, $2)
      `;
      
      await db.none(insertQuery, [req.body.species_name, req.body.is_mammal])
  
      res.status(201).json({
        status: "success",
        message: "New Species added!",
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