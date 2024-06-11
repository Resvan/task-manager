import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, required: true, enum: ['LOW', 'MEDIUM', 'HIGH']},
    deadline: { type: Number, required: true },
    projectId: {
        type: mongoose.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    image: { type: String }, 
    alt: { type: String },   
    tags: [{
        title: { type: String, required: true },
        bg: { type: String, required: true },
        text: { type: String, required: true }
    }],
    state: { type: String, required: true, enum: ['TODO', 'IN_PROGRESS', 'DONE'], default: 'TODO' },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
