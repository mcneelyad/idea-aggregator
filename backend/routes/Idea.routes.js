const router = require('express').Router();
const ideaService = require('../services/Idea.service');

router.get('/', async (req, res) => {
    const ideas = await ideaService.getIdeas();
    if (!ideas || ideas.length === 0) {
        return res.status(404).send({ error: 'No ideas found' });
    } else {
        return res.send({ ideas });
    }
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).send({ "error": 'Title and description are required' });
    }
    
    const newIdea = await ideaService.createIdea(title, description);
    if (!newIdea) {
        return res.status(500).send({ "error": 'Failed to create idea' });
    } else {
        return res.send({ "idea": newIdea });
    }
});

router.get('/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ "error": 'Idea ID is required' });
    }
    const idea = await ideaService.getIdea(req.params.id);
    if (!idea) {
        return res.status(404).send({ "error": 'Idea not found' });
    }
    return res.send(idea);
});

router.put('/:id', async (req, res) => {
    const { title, description, category, tags } = req.body;
    if (!title || !description) {
        return res.status(400).send({ "error": 'Title and description are required' });
    }

    if (!req.params.id) {
        return res.status(400).send({ "error": 'Idea ID is required' });
    }

    const updatedIdea = await ideaService.updateIdea(req.params.id, title, description);
    if (!updatedIdea) {
        return res.status(404).send({ "error": 'Idea not found' });
    }
    return res.send(updatedIdea);
});

router.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ "error": 'Idea ID is required' });
    }
    const deletedIdea = await ideaService.deleteIdea(req.params.id);
    if (!deletedIdea) {
        return res.status(404).send({ "error": 'Idea not found' });
    }
    return res.send({ "message": 'Idea deleted successfully' });
});

router.get('/category/:categoryId', async (req, res) => {
    if (!req.params.categoryId) {
        return res.status(400).send({ "error": 'Category ID is required' });
    }
    const ideas = await ideaService.getIdeasByCategory(req.params.categoryId);
    if (!ideas || ideas.length === 0) {
        return res.status(404).send({ "error": 'No ideas found' });
    }
    return res.send({ ideas });
});

router.get('/tag/:tagId', async (req, res) => {
    if (!req.params.tagId) {
        return res.status(400).send({ "error": 'Tag ID is required' });
    }
    const ideas = await ideaService.getIdeasByTag(req.params.tagId);
    if (!ideas || ideas.length === 0) {
        return res.status(404).send({ "error": 'No ideas found' });
    }
    return res.send({ ideas });
});

router.get('/:id/tags', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ "error": 'Idea ID is required' });
    }
    const ideaTags = await ideaService.getIdeaTags(req.params.id);
    if (!ideaTags) {
        return res.status(404).send({ "error": 'Idea not found' });
    }
    return res.send(ideaTags);
});

router.put('/:id/tags', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ "error": 'Idea ID is required' });
    }
    if (!req.body.tags) {
        return res.status(400).send({ "error": 'Tags are required' });
    }
    const updatedIdea = await ideaService.updateIdeaTags(req.params.id, req.body.tags);
    if (!updatedIdea) {
        return res.status(404).send({ "error": 'Cannot update tags' });
    }
    return res.send(updatedIdea);
});

module.exports = router;