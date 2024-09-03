const mongoose = require('mongoose');
const { Schema } = mongoose;

const ideaSchema = new Schema({
    title: String,
    description: String,
    development_stage: { 
        type: String, 
        default: 'concept', 
        enum: ['concept', 'planning', 'development', 'testing', 'launch'] 
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Idea', ideaSchema);