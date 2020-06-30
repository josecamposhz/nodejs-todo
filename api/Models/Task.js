const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
    description: { type: String, required: true },
    priority: { type: Number, enum: [0, 1, 2], required: true },
    state: { type: Boolean, default: false },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', required: true
    }
}, {
    timestamps: true
})

module.exports = model('Task', TaskSchema)