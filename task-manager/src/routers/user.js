const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.post('/users', async(req, res) => {
    console.log(req.body);
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send();
    }

    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch(err => {
    //     res.status(400);
    //     res.send(err);
    // })

});

router.get('/users', async(req, res) => {
    try {
        const user = await User.find({});
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send();
    }
    // User.find({}).then((users) => {
    //     res.send(users);
    // }).catch(err => {
    //     res.status(500).send();
    // });
});

router.get('/users/:id', async(req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        if(!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch(e) {
        res.status(500).send();
    }
    // User.findById(id).then((user) => {
    //     if(!user) {
    //         return res.status(404).send();
    //     }

    //     res.send(user);
    // }).catch(err => {
    //     res.status(500).send(err);
    // });
});

router.patch('/users/:id', async(req, res) => {
    const id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'});
    }

    try {
        //const user = await User.findByIdAndUpdate(id, req.body, { returnOriginal: false, runValidators: true });
        const user = await User.findById(id);

        if(!user) {
            return res.status(404).send();
        }

        updates.forEach(update => {
            user[update] = req.body[update];
        });
        await user.save();

        res.status(201).send(user);
    }catch(e) {
        res.status(400).send(e);
    }
});

router.delete('/users/:id', async(req,res) => {
    const id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(id);
        if(!user) {
            return res.status(404).send();
        }
        return res.status(200).send(user);
    } catch (e) {
        return res.status(500).send(e);
    }
});

module.exports = router;