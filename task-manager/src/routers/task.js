const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

router.post('/task', async(req, res) => {
    console.log(req.body);
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/tasks', async(req, res) => {
    try {
        const task = await Task.find({});
        res.status(201).send(task);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/task/:id', async(req, res) => {
    const id = req.params.id;

    try {
        const task = await Task.findById(id);
        if(!task) {
            res.status(404).send();
        }
        res.status(201).send(task);
    } catch(e) {
        res.status(500).send();
    }
});

router.patch('/task/:id', async(req, res) => {
    const id = req.params.id;
    const bodyParams = Object.keys(req.body);
    const allowedUpdates = ['completed', 'description'];
    const isValidOperation = bodyParams.every(update => {
        return allowedUpdates.includes(update);
    });

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'});
    }

    try {
        // const task = await Task.findByIdAndUpdate(id, req.body, { returnOriginal: false, runValidators: true });
        const task = await Task.findById(id);
        if(!task) {
            return res.status(404).send();
        }
        bodyParams.forEach(bodyParam => {
            task[bodyParam] = req.body[bodyParam];
        });

        await task.save();
        
        return res.status(200).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.delete('/task/:id', async(req, res) => {
    const id = req.params.id;

    try {
        const task = await Task.findOneAndDelete(id);
        if(!task) {
            return res.status(404).send(task);
        }
        return res.status(200).send(task);
    } catch (e) {
        return res.status(500).send();
    }
});

module.exports = router;