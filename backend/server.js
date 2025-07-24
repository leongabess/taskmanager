const express = require("express");
const cors = require("cors");
const {
    createTask,
    readTasks,
    readTasksByStatus,
    updateTask,
    removeTask
} = require('./tasks.js')

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Use /api/tasks after the port number.")
});


//returns tasks by status or all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const status = req.query.status;
        const tasks = status
            ? await readTasksByStatus(status) 
            : await readTasks();
        res.json(tasks);
    } catch (err){
    console.error(err);
    res.status(500).json({ Error: 'There was an error while searching for the tasks'});
    }
});

//creates new tasks
app.post('/api/tasks', async (req, res) => {
    const { title, status, description } = req.body;
    if (!title || !status || !description){
        return res.status(400).json({ error: 'State a task name status and description'});
    }

    try {
        const newTask = await createTask ({ title, status, description});
        res.status(201).json(newTask);
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'There was an error while trying to create the task'});
    }
});



app.patch('/api/tasks', async (req, res) => {
    const { title, status} = req.body;
    if (!title) return res.status(400).json({ error: 'Please state a title'});

    try {
        const updated = await updateTask(title, { status });
        if (!updated) return res.status(404).json({ message: 'Task not found'});
        res.status(200).json(updated);
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar tarefa.'});
    }
});


app.delete ('/api/tasks', async (req, res) => {
    const {title, status} = req.body;
    if (!title && !status){
        return res.status(400).json({ error: "Please state a task or status to remove"});
    }

    try {
        const taskToDelete = await removeTask(title, status);
        if (taskToDelete) {
            res.status(200).json({ message: 'Tasks removed'});
        } else {
            res.status(404).json({ error: 'No task found to be removed'});
        }
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'There was an error trying to remove a task'})
    }
})
app.listen(PORT, () => {
    console.log(`Server running at https://localhost:${PORT}`)
        ;
})  