import { pool } from './db.js';


//creates a task, while adding the title, description, status
export async function createTask(task) {
    const result = await pool.query(
        `INSERT INTO tasks (title, description, status)
        VALUES ($1, $2, $3) RETURNING *`,
        [task.title, task.description, task.status || 'pending']
    );
    return result.rows[0];
};


//reads the .json file  and returns a empty array if the file isn't found
export async function readTasks() {
    const tasksToRead = await pool.query('SELECT * FROM tasks ORDER BY title');
    return tasksToRead.rows;
    
};

export async function readTasksByStatus(status){
    const tasksByStatus = await pool.query (
        'SELECT * FROM tasks WHERE LOWER(status) = LOWER($1) ORDER BY title',
        [status]
    );
    return tasksByStatus.rows;
};

//updates the task by searching the title and also registers the time it was updated
export async function updateTask(title, updates) {
    const taskToUpdate = await pool.query(
        `UPDATE tasks SET
            status = $1,
            updated_at = NOW()
         WHERE LOWER (title) = LOWER($2) RETURNING *`,
        [updates.status, title]
    );
    return taskToUpdate.rows[0];    
};

//removes a task based on the specified title or removes all tasks based on the specified status
export async function removeTask(title, status) {
    let taskToRemove;
    if(title){ taskToRemove = await pool.query(
        'DELETE FROM tasks WHERE LOWER (title) = LOWER($1)',
        [title]
        );
    }
    else if (status){ taskToRemove = await pool.query(
        'DELETE FROM tasks WHERE LOWER (status) = LOWER($1)',
        [status]
        )
    };
    return taskToRemove.rowCount > 0;
};

