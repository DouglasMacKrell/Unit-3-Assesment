const express = require('express');
const router = express.Router();

const db = require('../db');

router.get("/", async (req, res) => {
    try {
        let getQuery = `
        SELECT *
        FROM sightings
        `;

        let getAllSightings = await db.any(getQuery)

        res.status(200).json({
            status: "success",
            message: "Who's seeing all of these Sightings?!",
            payload: getAllSightings
        })
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: "Oops! All Errors!"
        })
    }
})

router.get("/species/:id", async (req, res) => {
    try {
        let species = parseInt(req.params.id)
        let getQuery = `
        SELECT *
        FROM sightings
        WHERE species_id = $1
        `;

        let getAllBySpecies = await db.any(getQuery, species)
        res.status(200).json({
            status: "success",
            message: "Here's all the sightings by species you asked for.",
            payload: getAllBySpecies
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Oops! All Errors!"
        })
    }
})

router.get("/researchers/:id", async (req, res) => {
    try {
        let researcher = parseInt(req.params.id)
        let getQuery = `
        SELECT *
        FROM sightings
        WHERE researcher_id = $1
        `;

        let getAllByResearcher = await db.any(getQuery, researcher)
        res.status(200).json({
            status: "success",
            message: "Here's all the sightings by Researcher you asked for.",
            payload: getAllByResearcher
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Oops! All Errors!"
        })
    }
})

router.get("/habitats/:id", async (req, res) => {
    try {
        let habitat = parseInt(req.params.id)
        let getQuery = `
        SELECT *
        FROM sightings
        WHERE habitat_id = $1
        `;

        let getAllByHabitat = await db.any(getQuery, habitat)
        res.status(200).json({
            status: "success",
            message: "Here's all the sightings by Habitat you asked for.",
            payload: getAllByHabitat
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
      INSERT INTO sightings(researcher_id, species_id, habitat_id)
      VALUES ($1, $2, $3)
      `;
      
      await db.none(insertQuery, [req.body.researcher_id, req.body.species_id, req.body.habitat_id])
  
      res.status(201).json({
        status: "success",
        message: "New Sighting added!",
        payload: req.body
      })
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Oops! All Errors!"
      })
    }
})

router.delete("/:sighting_id", async (req, res) => {
    try {
        let deleteQuery = `
     DELETE FROM sightings
     WHERE sighting_id = $1
     `;

        await db.none(deleteQuery, parseInt(req.params.sighting_id))

        res.status(200).json({
            status: "success",
            message: "Sighting deleted"
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Oops! All Errors!"
        })
    }
})

module.exports = router;