const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

router.post('/users', async(req, res) => {
    console.log(req.body);
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();

        res.status(201).send({user, token});
    } catch (err) {
        res.status(400).send();
    }
});

router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
});

router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
        await req.user.save();

        res.send();
    } catch(e) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async(req,res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send();
    } catch(e) {
        res.status(500).send();
    }
});

router.get('/users/me', auth, async(req, res) => {
    // try {
    //     const user = await User.find({});
    //     res.status(200).send(user);
    // } catch (err) {
    //     res.status(400).send();
    // }
    res.send(req.user);
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
});

router.patch('/users/me', auth, async(req, res) => {
    //const id = req.params.id;
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
        //const user = await User.findById(id);

        // if(!user) {
        //     return res.status(404).send();
        // }

        updates.forEach(update => {
            req.user[update] = req.body[update];
        });
        await req.user.save();

        res.status(201).send(req.user);
    }catch(e) {
        res.status(400).send(e);
    }
});

router.delete('/users/me', auth, async(req,res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id);
        // if(!user) {
        //     return res.status(404).send();
        // }

        await req.user.remove();
        res.status(200).send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;