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
    // task.save().then(() => {
    //     res.status(201).send(task);
    // }).catch(err => {
    //     res.status(400);
    //     res.send(err);
    // })
});

router.get('/tasks', async(req, res) => {
    try {
        const task = await Task.find({});
        res.status(201).send(task);
    } catch (e) {
        res.status(500).send();
    }
    // Task.find({}).then((tasks) => {
    //     res.status(201).send(tasks);
    // }).catch(err => {
    //     res.status(500).send();
    // });
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
    // Task.findById(id).then((task) => {
    //     if(!task) {
    //         res.status(404).send();
    //     }
    //     res.send(task);
    // }).catch((err) => {
    //     res.status(500).send();
    // });
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
        const task = await Task.findByIdAndUpdate(id, req.body, { returnOriginal: false, runValidators: true });
        if(!task) {
            return res.status(404).send();
        }
        return res.status(200).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.delete('/task/:id', async(req, res) => {
    const id = req.params.id;

    try {
        const task = await Task.findByIdAndDelete(id);
        if(!task) {
            return res.status(404).send(task);
        }
        return res.status(200).send(task);
    } catch (e) {
        return res.status(500).send();
    }
});

module.exports = router;