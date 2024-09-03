const Idea = require('../database/schemas/Idea.schema.js');

const createIdea = async (title, description) => {
    const newIdea = new Idea({ title, description });
    return newIdea.save();
}

const getIdeas = async () => {
    const ideas = await Idea.find({});
    if (!ideas) {
        return [];
    }
    return ideas;
}

const getIdea = async (id) => {
    const idea = await Idea.findById({ _id: id });
    if (!idea) {
        return null;
    }
    return idea;
}

const updateIdea = async (id, title, description) => {
    const updatedIdea = await Idea.findByIdAndUpdate(id, { title, description }, { new: true });
    if (!updatedIdea){ 
        return null;
    }
    return updatedIdea;
}

const deleteIdea = async (id) => {
    return Idea.findByIdAndDelete(id);
}

module.exports = {
    createIdea,
    getIdeas,
    getIdea,
    updateIdea,
    deleteIdea
};