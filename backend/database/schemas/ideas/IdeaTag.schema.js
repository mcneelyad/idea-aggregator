const mongoose = require('mongoose');

const IdeaTagSchema = new mongoose.Schema({
    idea: mongoose.Schema.Types.ObjectId,
    tag: mongoose.Schema.Types.ObjectId,

});

module.exports = mongoose.model('IdeaTag', IdeaTagSchema);