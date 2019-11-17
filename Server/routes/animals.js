const express = require('express');
const router = express.Router();

const db = require('../db');

router.get("/", async (req, res) => {
    try {
        let getQuery = `
        SELECT *
        FROM animals
        `;

        let getAllAnimals = await db.any(getQuery)

        res.status(200).json({
            status: "success",
            message: "Get a load of all these animals!",
            payload: getAllAnimals
        })
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: "Oops! All Errors!"
        })
    }
})

router.get("/:animal_id", async (req, res) => {
    try {
        let animal = parseInt(req.params.animal_id)
        let getQuery = `
        SELECT *
        FROM animals
        WHERE animal_id = $1
        `;

        let getSingleAnimal = await db.any(getQuery, animal)
        res.status(200).json({
            status: "success",
            message: "Here's that one animal you asked for.",
            payload: getSingleAnimal
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
      INSERT INTO animals(species_id, nickname)
      VALUES ($1, $2)
      `;

        let addNewAnimal = await db.none(insertQuery, [req.body.species_id, req.body.nickname])

        res.status(201).json({
            status: "success",
            message: "New animal added!",
            payload: req.body
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Oops! All Errors!"
        })
    }
})

router.patch("/:animal_id", async (req, res) => {
    if (req.body.species_id) {
        try {
            let updateQuery = `
        UPDATE animals
        SET species_id = $1
        WHERE animal_id = $2 
        `;

            await db.none(updateQuery, [req.body.species_id, req.params.animal_id])

            res.status(201).json({
                status: "success",
                message: "Animal Species updated!"
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
        UPDATE animals
        SET nickname = $1
        WHERE animal_id = $2 
        `;

            await db.none(updateQuery, [req.body.nickname, req.params.animal_id])

            res.status(201).json({
                status: "success",
                message: "Animal Nickname updated!"
            })
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "Oops! All Errors!"
            })
        }
    }
})

router.delete("/:animal_id", async (req, res) => {
    try {
        let deleteQuery = `
     DELETE FROM animals
     WHERE animal_id = $1
     `;

        await db.none(deleteQuery, parseInt(req.params.animal_id))

        res.status(200).json({
            status: "success",
            message: "Animal deleted"
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Oops! All Errors!"
        })
    }
})

module.exports = router;