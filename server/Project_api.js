const express = require("express");
const cors = require("cors");
const Projects = require('./Projects');

const PORT = 3100;

const app = express();
app.use(express.json());
app.use(cors());

const projects = new Projects(); // Create an instance of the Projects class

// Route to create a project
app.post('/api/projects', async (req, res) => {
    try {
        const { name } = req.body;
        const newProject = await projects.createProject(name);
        res.json(newProject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get all projects
app.get('/api/projects', async (req, res) => {
    try {
        const allProjects = await projects.getProjects();
        res.json(allProjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update a project
app.put('/api/projects/:id', async (req, res) => {
    try {
        const projectId = req.params.id;
        const updates = req.body;
        const updatedProject = await projects.updateProject(projectId, updates);
        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a project
app.delete('/api/projects/:id', async (req, res) => {
    try {
        const projectId = req.params.id;
        const deletedProject = await projects.deleteProject(projectId);
        res.json(deletedProject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
