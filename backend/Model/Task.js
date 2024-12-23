const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;