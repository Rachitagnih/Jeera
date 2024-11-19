const express = require('express');
const { createTask } = require('../Controllers/Task');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { updateTask } = require('../Controllers/Task');
const { deleteTask } = require('../Controllers/Task');
const router  = express.Router();

router.post('/createTask',isAuthenticated, createTask);
router.post('/updateTask',isAuthenticated, updateTask);
router.post('/deleteTask',isAuthenticated, deleteTask);

module.exports = router;