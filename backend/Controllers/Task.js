const { startSession } = require('mongoose');
const Task = require('../Model/Task');
const User = require('../Model/User');
const { response } = require('express');

const createTask = async(req, res) => {
    try{
        const userId = req.body.userId;
        let user = await User.findById(userId);
        var task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            assignedTo: userId,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        });
        // user.tasks = [];
        user.tasks.push(task._id);
        await user.save();
        res.json(task);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

const updateTask = async(req, res) => {
    try{
        const taskId = req.query.taskId;
        
        const updatedTask = await Task.findByIdAndUpdate(taskId, 
                {
                    title: req.body.title,
                    description: req.body.description,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    assignedTo: req.body.assignedTo
                },
                {new : true}
            );
        if(!updatedTask)
            return res.status(404).send({message: "Task not found"});
        res.json(updatedTask);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

const deleteTask = async (req, res) => {
    try{
        const taskId = req.query.taskId;
        const userId = req.body.userId;
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if(!deletedTask)
            return res.status(404).send("Task not found");

        const user = await User.findById(userId);

        if(user){
            user.tasks = user.tasks.filter(t => t._id != taskId)
            await user.save();
        }
        else
            return res.status(404).send("User not found");

        // delete the task from the project as well

        res.json(deletedTask);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {createTask, updateTask, deleteTask};