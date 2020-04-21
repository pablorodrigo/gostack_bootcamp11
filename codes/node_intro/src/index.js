const express = require('express');

const app = express();

// get information from API
app.get('/projects', (request, response) => {
    return response.json(['Project1', 'Project2']
    )
});
// create new information
app.post('/projects', (request, response) => {
    return response.json(['Project1', 'Project2']
    )
});
// update an information
app.put('/projects/:id', (request, response) => {
    return response.json(['Project1', 'Project2']
    )
});
// delete an information
app.delete('/projects/:id', (request, response) => {
    return response.json(['Project1', 'Project2']
    )
});

app.listen(3333, () => {
    console.log('🚀 server running! 🚀')
})
