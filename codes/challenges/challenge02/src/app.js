const express = require("express");
const cors = require("cors");

const {uuid, isUuid} = require('uuidv4')

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// list of repositories
app.get("/repositories", (request, response) => {
    return response.json(repositories);
});

// create new repository
app.post("/repositories", (request, response) => {
    // TODO
});

// update a repository
app.put("/repositories/:id", (request, response) => {
    // TODO
});

app.delete("/repositories/:id", (request, response) => {
    // TODO
});

app.post("/repositories/:id/like", (request, response) => {
    // TODO
});

module.exports = app;
