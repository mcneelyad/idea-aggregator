const Idea = require('../database/schemas/ideas/Idea.schema.js');
const IdeaTag = require('../database/schemas/ideas/IdeaTag.schema.js');
const Tag = require('../database/schemas/Tag.schema.js');

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
    try {
        const idea = await Idea.findById(id);
        if (!idea) {
            return null;
        }

        const tagList = await IdeaTag.find({ idea: id }); // get all tags for the idea
        const updatedTagList = await Promise.all(tagList.map(async (tagItem) => {
            const tag = await Tag.findById(tagItem.tag); // get the tag details
            if (!tag) {
                return null; // skip if tag not found
            }
            return { id: tag._id, name: tag.name }; // return only the id and name
        }));

        idea.tags = updatedTagList.filter(tag => tag !== null); // filter out null values
        return idea;
    } catch (error) {
        console.error('Error fetching idea:', error);
        throw error;
    }
};

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

const getIdeasByCategory = async (categoryId) => {
    return Idea.find({ category: categoryId });
}

const getIdeaTags = async (ideaId) => {
    return Idea.findById(ideaId).populate('tags');
}

const getIdeasByTag = async (tagId) => {
    return Idea.find({ tags: tagId });
}

const updateIdeaTags = async (ideaId, tagIds) => {
    const currentTags = await IdeaTag.find({ idea: ideaId });
    await Promise.all(currentTags.map(async (tag) => {
        await IdeaTag.findByIdAndDelete(tag._id);
    }));

    await Promise.all(tagIds.map(async (tagId) => {
        const newTag = new IdeaTag({ idea: ideaId, tag: tagId });
        await newTag.save(); 
    }));

    return getIdea(ideaId); 
}

module.exports = {
    createIdea,
    getIdeas,
    getIdea,
    updateIdea,
    deleteIdea,
    getIdeasByCategory,
    getIdeasByTag,
    getIdeaTags,
    updateIdeaTags
};