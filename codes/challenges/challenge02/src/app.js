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
    const {title, url, techs} = request.body

    const repository = {id: uuid(), title, url, techs, likes: 0};

    repositories.push(repository);

    return response.json(repositories);
});

// update a repository
app.put("/repositories/:id", (request, response) => {
    const {id} = request.params;
    const {title, url, techs} = request.body

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if (repositoryIndex < 0) {
        return response.status(400).json({error: 'Repository not found'})
    }

    repositories[repositoryIndex] = {
        id,
        title,
        url,
        techs
    };

    return response.json(repositories)
});

app.delete("/repositories/:id", (request, response) => {
    const {id} = request.params;

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if (repositoryIndex < 0) {
        return response.status(400).json({error: 'Repository not found'})
    }

    repositories.splice(repositoryIndex, 1)

    return response.status(200).send();
});

app.post("/repositories/:id/like", (request, response) => {
    // TODO
});

module.exports = app;
