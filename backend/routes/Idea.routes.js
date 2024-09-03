const router = require('express').Router();
const ideaService = require('../services/Idea.service');

router.get('/', async (req, res) => {
    const ideas = await ideaService.getIdeas();
    if (!ideas || ideas.length === 0) {
        res.status(404).send({ error: 'No ideas found' });
    } else {
        res.send({ ideas });
    }
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        res.status(400).send({ "error": 'Title and description are required' });
    }
    
    const newIdea = await ideaService.createIdea(title, description);
    if (!newIdea) {
        res.status(500).send({ "error": 'Failed to create idea' });
    } else {
        res.send({ "idea": newIdea });
    }
});

router.get('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({ "error": 'Idea ID is required' });
    }
    const idea = await ideaService.getIdea(req.params.id);
    if (!idea) {
        res.status(404).send({ "error": 'Idea not found' });
    }
    res.send({ idea });
});

router.put('/:id', async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        res.status(400).send({ "error": 'Title and description are required' });
    }

    if (!req.params.id) {
        res.status(400).send({ "error": 'Idea ID is required' });
    }

    const updatedIdea = await ideaService.updateIdea(req.params.id, title, description);
    if (!updatedIdea) {
        res.status(404).send({ "error": 'Idea not found' });
    }
    res.send(updatedIdea);
});

router.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({ "error": 'Idea ID is required' });
    }
    const deletedIdea = await ideaService.deleteIdea(req.params.id);
    if (!deletedIdea) {
        res.status(404).send({ "error": 'Idea not found' });
    }
    res.send({ "message": 'Idea deleted successfully' });
});

module.exports = router;