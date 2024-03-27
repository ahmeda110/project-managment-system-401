const express = require("express");
const cors = require("cors");
const Tasks = require('./Tasks');
const Projects = require('./Projects');
const TasksByProject = require('./getTasksByProject');
const projects = new Projects(); // Create an instance of the Projects class
const Members = require('./Members');



const PORT = 3100;

const app = express();
app.use(express.json());
app.use(cors());

const tasks = new Tasks(); // Create an instance of the Tasks class
const tasksByProject = new TasksByProject();
const members = new Members(); // Create an instance of the Members class


// Route to create a task -- DONE
app.post('/api/tasks', async (req, res) => {
    try {
        const { status, name, description, priority, assigned_to, due_date, project_id } = req.body;
        const newTask = await tasks.createTask(String(status), name, description, priority, assigned_to, due_date, project_id);
        res.json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get all tasks -- DONE
app.get('/api/tasks', async (req, res) => {
    try {
        const allTasks = await tasks.getTasks();
        console.log(allTasks)
        res.json(allTasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update a task
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const updates = req.body;
        const updatedTask = await tasks.updateTask(taskId, updates);
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await tasks.deleteTask(taskId);
        res.json(deletedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});






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

// Route to get tasks by project
app.get('/api/tasks/project/:projectId', async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const tasks = await tasksByProject.getTasksByProject(projectId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// project name by id
app.get('/project/:projectId', async (req, res) => {
    const { projectId } = req.params;
    try {
        const projectName = await getProjectNameById(projectId);
        res.json({ projectName });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get project name' });
    }
});



// Route to get tasks by member
app.get('/api/tasks/member/:memberId', async (req, res) => {
    try {
        const memberId = req.params.memberId;
        const tasks = await tasksByProject.getTasksByMember(memberId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Route to create a member
app.post('/api/members', async (req, res) => {
    try {
        const { email, name, phone_number, permission } = req.body;
        const newMember = await members.createMember(email, name, phone_number, permission);
        res.json(newMember);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get all members
app.get('/api/members', async (req, res) => {
    try {
        const allMembers = await members.getMembers();
        res.json(allMembers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update a member
app.put('/api/members/:id', async (req, res) => {
    try {
        const memberId = req.params.id;
        const updates = req.body;
        const updatedMember = await members.updateMember(memberId, updates);
        res.json(updatedMember);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a member
app.delete('/api/members/:id', async (req, res) => {
    try {
        const memberId = req.params.id;
        const deletedMember = await members.deleteMember(memberId);
        res.json(deletedMember);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get member details by ID
app.get('/api/members/:id', async (req, res) => {
    try {
        const memberId = req.params.id;
        const memberDetails = await members.getMemberById(memberId);
        res.json(memberDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get member name by ID
app.get('/api/members/:id/name', async (req, res) => {
    try {
        const memberId = req.params.id;
        const memberName = await members.getMemberNameById(memberId);
        res.json({ name: memberName });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get member ID by email
app.get('/api/members/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const memberId = await members.getMemberIdByEmail(email);
        res.json({ memberId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

//152 get all members
//106 delete project