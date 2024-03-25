const express = require("express");
const cors = require("cors");
const Tasks = require('./Tasks');

const PORT = 3100;

const app = express();
app.use(express.json());
app.use(cors());

const tasks = new Tasks(); // Create an instance of the Tasks class

// Route to create a task
app.post('/api/tasks', async (req, res) => {
    try {
        const { status, name, description, priority, assigned_to, due_date, estimated_time } = req.body;
        const newTask = await tasks.createTask(status, name, description, priority, assigned_to, due_date, estimated_time);
        res.json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const allTasks = await tasks.getTasks();
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

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});




// const express = require("express");
// const cors = require("cors");
// const Tasks = require('./Tasks');

// const PORT = 3100;

// const app = express();
// app.use(express.json());
// app.use(cors());

// const tasks = new Tasks(); // Create an instance of the Tasks class

// // Route to create a task
// app.post('/api/tasks', async (req, res) => {
//     try {
//         const { name, description, date } = req.body;
//         const newTask = await tasks.createTask(name, description, date);
//         res.json(newTask);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Route to get all tasks
// app.get('/api/tasks', async (req, res) => {
//     try {
//         const allTasks = await tasks.getTasks();
//         console.log(allTasks);
//         res.json(allTasks);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Route to update a task
// app.put('/api/tasks/:id', async (req, res) => {
//     try {
//         const taskId = req.params.id;
//         const updates = req.body;
//         const updatedTask = await tasks.updateTask(taskId, updates);
//         res.json(updatedTask);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Route to delete a task
// app.delete('/api/tasks/:id', async (req, res) => {
//     try {
//         const taskId = req.params.id;
//         const deletedTask = await tasks.deleteTask(taskId);
//         res.json(deletedTask);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });



// app.listen(PORT, () => {
//     console.log(`Server listening on ${PORT}`);
// });
