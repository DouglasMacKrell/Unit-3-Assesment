
/* MODULES */
const express = require('express');
const app = express();
const port = 11100;
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const cors = require('cors');
app.use(cors());


/* SERVER START */
app.listen(port, () => {
    console.log(`Holding Server is now listening on port ${port}. Batten down the hatches!`);
});

/* ROUTES */
// const animals = require('./routes/animals');
// const habitats = require('./routes/habitats');
const researchers = require('./routes/Researchers');
// const sightings = require('./routes/sightings');
// const species = require('./routes/species');
const index = require('./routes/index')

/* CONNECTS */
app.use('/', index);
// app.use('/animals', animals);
// app.use('/habitats', habitats);
app.use('/researchers', researchers);
// app.use('/sightings', sightings);
// app.use('/species', species);

/* NO ROUTE STOP */
app.use("*", (req, res) => {
    res.status(404).send('Error: no such route found on Sealab 2021 server. Try again.');
});

