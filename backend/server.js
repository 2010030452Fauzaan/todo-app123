const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Allow requests from other domains

const DATA_FILE = 'tasks.json';

// Load tasks from file
const loadTasks = () => {
    if (fs.existsSync(DATA_FILE)) {
        return JSON.parse(fs.readFileSync(DATA_FILE));
    }
    return [];
};

// Save tasks to file
const saveTasks = (tasks) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
};

// API endpoints
app.get('/tasks', (req, res) => {
    const tasks = loadTasks();
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const tasks = loadTasks();
    tasks.push(req.body);
    saveTasks(tasks);
    res.status(201).send('Task added');
});

app.delete('/tasks', (req, res) => {
    saveTasks([]);
    res.send('All tasks deleted');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
