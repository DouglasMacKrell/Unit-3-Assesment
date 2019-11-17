document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded")
    loadSightings()
    const form = document.querySelector("#formy-mcformface")
    form.addEventListener("submit", researcherCheck)
})

const loadSightings = async () => {
    let response = await axios.get(`http://localhost:11100/sightings/`);
    let allSightings = response.data.payload
    let list = document.querySelector("#listy-mclistface")
    for (let sight of allSightings) {
        console.log(sight)
        let newSighting = document.createElement("li")
        newSighting.innerText = `${sight.job_title} ${sight.researcher_name} spotted a ${sight.species_name} somewhere around ${sight.category}`
        list.append(newSighting)
    }
}

const researcherCheck = async (event) => {
    event.preventDefault();
    clearList()
    clearAlert()
    let userInput = document.querySelector("#user-input").value
    if (!userInput) {
        let alert = document.querySelector("#alert")
        alert.innerText = "Enter a name if you want to search!"
        return loadSightings()
    }
    let response = await axios.get(`http://localhost:11100/sightings/`)
    let allSightings = response.data.payload
    let list = document.querySelector("#listy-mclistface")
    for (let sight of allSightings) {
        if (sight.researcher_name === userInput) {
            console.log(sight)
            let newSighting = document.createElement("li")
            newSighting.innerText = `${sight.job_title} ${sight.researcher_name} spotted a ${sight.species_name} somewhere around ${sight.category}`
            list.append(newSighting)
        }
    }
}

const clearList = () => {
    let list = document.querySelector("#listy-mclistface")
    while (list.hasChildNodes()) {  
        list.removeChild(list.firstChild);
    }
}

const clearAlert = () => {
    let alert = document.querySelector("#alert")
    alert.innerText = ""
}