const { pool } = require('../config/db.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//creation of users using bcrypt to secure the password
async function createUsers (req, res) {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await pool.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
    [username, hash]
  );
  res.json({ id: user.rows[0].id });
};

//login of users using jwt to keep their session
async function loginUser (req, res){
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'User not found' });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Wrong password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error while trying to login' });
  }
};

//get tasks filtered by the user
async function getTasksUser (req, res) {
    try {
        const userId = req.userId;
        const status = req.query.status;

        const query = status 
            ? await pool.query(
                'SELECT * FROM tasks WHERE user_id = $1 AND LOWER(status) = LOWER($2) ORDER BY title',
                [userId, status]
              )
            : await pool.query(
                'SELECT * FROM tasks WHERE user_id = $1 ORDER BY title',
                [userId]
              );

        res.json(query.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: 'Error while trying to fin tasks' });
    }
};

//users create their tasks
async function createTasksUsers (req, res) {
    const { title, status, description } = req.body;
    const userId = req.userId;

    if (!title || !status || !description) {
        return res.status(400).json({ error: 'Please state a title, description and status' });
    }

    try {
        const result = await pool.query(
            `INSERT INTO tasks (title, description, status, user_id)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [title, description, status || 'pending', userId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'There was an error while trying to create the task' });
    }
};

//udates the task by using their title
async function updateTasksUsers (req, res){
    const { title, status } = req.body;
    const userId = req.userId;

    if (!title) return res.status(400).json({ error: 'State the title' });

    try {
        const result = await pool.query(
            `UPDATE tasks SET status = $1, updated_at = NOW()
             WHERE LOWER(title) = LOWER($2) AND user_id = $3 RETURNING *`,
            [status, title, userId]
        );

        if (result.rows.length === 0) return res.status(404).json({ error: 'Task not found' });
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'There was an error while trying to update the task' });
    }
};

//removes a task of a user or remove all tasks that matches a status
async function deleteTasksUser (req, res){
    const { title, status } = req.body;
    const userId = req.userId;

    if (!title && !status) {
        return res.status(400).json({ error: 'State the title to remove' });
    }

    try {
        let result;
        if (title) {
            result = await pool.query(
                'DELETE FROM tasks WHERE LOWER(title) = LOWER($1) AND user_id = $2',
                [title, userId]
            );
        } else if (status) {
            result = await pool.query(
                'DELETE FROM tasks WHERE LOWER(status) = LOWER($1) AND user_id = $2',
                [status, userId]
            );
        }

        if (result.rowCount === 0) return res.status(404).json({ error: 'No task found' });
        res.status(200).json({ message: 'Tasks removed' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error while trying to remove task' });
    }
};

module.exports = {
    createUsers,
    loginUser,
    getTasksUser,
    createTasksUsers,
    updateTasksUsers,
    deleteTasksUser
}