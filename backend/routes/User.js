const express = require('express');
const { signup, login, getAllTasks, getAllProjects} = require('../Controllers/User');
const isAuthenticated = require('../middlewares/isAuthenticated');
const router  = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/getAllTasks', isAuthenticated, getAllTasks);
router.post('/getAllProjects', isAuthenticated, getAllProjects);

module.exports = router;