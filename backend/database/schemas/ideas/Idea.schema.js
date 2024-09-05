const mongoose = require('mongoose');
const { Schema } = mongoose;

const ideaSchema = new Schema({
    title: String,
    description: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    development_stage: { 
        type: String, 
        default: 'concept', 
        enum: ['concept', 'planning', 'development', 'testing', 'launch'] 
    },
    tags: [{
        id: { type: Schema.Types.ObjectId, ref: 'Tag' },
        name: { type: String, required: true }
    }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Idea', ideaSchema);