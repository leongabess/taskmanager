const express = require("express");
const { authMiddleWare } = require('../middleware/authMiddleWare.js');
const router = express.Router();
const taskController = require('../controllers/taskController.js');

router.post('/signup', taskController.createUsers); //body "username", "password"
router.post('/login', taskController.loginUser); //body "username:", "password"

router.use(authMiddleWare);//token jwt

router.post('/tasks', taskController.createTasksUsers);//body "title:", "description:", "status: "
router.get('/tasks', taskController.getTasksUser);//body "id:" or "id:", "status: "
/*router.patch('/tasks', taskController.updateTasksUsers);//body "title:" "status:"*/
router.patch('/tasks/:id', taskController.updateTasksUsers);//body "status:"
/*router.delete('/tasks', taskController.deleteTasksUser);//body "title:" or "status:"*/
router.delete('/tasks/:id', taskController.deleteTasksUser);//body "title:" or "status:"

module.exports = router;

