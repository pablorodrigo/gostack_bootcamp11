import React, {useState, useEffect} from 'react';
import api from "./services/api";
import './App.css'

import background from './assets/images/photo1.jpg'

import Header from "./components/Header";


function App() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/projects').then(response => {
            console.log(response.data);
            setProjects(response.data);
        })
    }, []);

    async function handleAddProject() {

        //setProjects([...projects, `New project added ${Date.now()}`])

        const response = await api.post('/projects', {
            title: `New project added ${Date.now()}`,
            owner: "Pablo Silva",
        });

        const project = response.data;

        setProjects([...projects, project])

        console.log(projects)
    }

    return (
        <>
            <Header title="Homepage"/>
            <ul>
                {projects.map(project => (
                    <li key={project.id}>{project.title}</li>
                ))}
            </ul>
            <button type="button"
                    onClick={handleAddProject}>Add project
            </button>
        </>
    );
}

export default App;
