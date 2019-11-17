UNIT 3 ASSESSMENT


1. Read ReadMe
    1. DATABASE
        1. Tables
            1. Researchers 
                1. Rows represent each individual member of the research team.
            2. Species
                1. Rows represent each different type of animal species (e.g. dolphin or sting ray).
                2. Joins ANIMALS and SIGHTINGS
            3. Animals
                1. Rows represent each animal researchers have found and tagged.
                2. Have one UNIQUE SPECIES
            4. Habitats
                1. Rows represent different types of habitats in the researchers' area (e.g. reef, beach, shallows, deeps).
            5. Sightings
                1. Rows represent each time a researcher saw a specific species in a particular habitat.
                2. Researchers see SPECIES
                3. Have one instance of RESEARCHER, SPECIES, and HABITAT
        2. Components
            * Researchers
                * id: Integer, primary key.
                * name: String.
                * job_title: String.
            * Species
                * id: Integer, primary key.
                * name: String.
                * is_mammal: Boolean.
            * Animals
                * id: Integer, primary key.
                * species_id: Integer, foreign key referencing id column in Species table.
                * nickname: String.
            * Habitats
                * id: Integer, primary key.
                * category: String.
            * Sightings
                * id: Integer, primary key.
                * researcher_id: Integer, foreign key referencing id column in Researchers table. Add "ON DELETE SET NULL".
                * species_id: Integer, foreign key referencing id column in Species table. Add "ON DELETE CASCADE".
                * habitat_id: Integer, foreign key referencing id column in Habitats table.
    2. BACKEND
        * Researchers
            * GET /researchers: Get all researchers.
            * GET /researchers/:id: Get single researcher.
            * POST /researchers: Add new researcher.
            * PATCH /researchers/:id: Update single researcher.
            * DELETE /researchers/:id: Delete single researcher.
        * Species
            * GET /species: Get all species.
            * GET /species/:id: Get single species.
            * POST /species: Add new species.
        * Animals
            * GET /animals: Get all animals.
            * GET /animals/:id: Get single animal.
            * POST /animals: Add new animal.
            * PATCH /animals/:id: Update single animal.
            * DELETE /animals/:id: Delete single animal.
        * Habitats
            * GET /habitats: Get all habitats.
            * GET /habitats/:id: Get single habitat.
            * POST /habitats: Add new habitat.
        * Sightings
            * GET /sightings: Get all sightings.
            * GET /sightings/species/:id: Get all sightings of a specific species.
            * GET /sightings/researchers/:id: Get all sightings for a specific researcher.
            * GET /sightings/habitats/:id: Get all sightings for a specific habitat.
            * POST /sightings: Add new sighting.
            * DELETE /sightings/:id: Delete single sighting.

    3. CLIENT
        1. Connect to your server, and have a website with the following functionality:
            * Show all sightings
            * Show all sightings from a given researcher