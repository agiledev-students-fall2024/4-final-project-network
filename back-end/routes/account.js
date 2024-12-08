const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')
const { body, validationResult } = require('express-validator')
const User = require('../models/User.js')
const Blocked = require('../models/Blocked.js')
const Post = require('../models/Post.js')


router.get('/edit', 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
        const user = JSON.parse(JSON.stringify(req.user))
        delete user.password
        delete user.__v
        delete user._id
        return res.status(200).json(user);
    }
)

router.put('/edit', 
    passport.authenticate('jwt', { session: false }), 
    [
        body('name')
            .notEmpty()
            .withMessage('Name is required.')
            .isLength({ min:1, max: 50 })
            .withMessage('Name must be between 1 and 50 characters.'),
        body('bio')
            .optional()
            .isLength({ max: 500 })
            .withMessage('Bio should be a maximum of 500 characters.'),
        body('layout')
            .notEmpty()
            .withMessage('Layout is required.')
            .isIn(['list', 'list-title', 'masonry', 'masonry-title', 'grid'])
            .withMessage('Invalid layout option.'),
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false,
                message: errors.array()[0].msg 
            })
        }

        try {
            const user = await User.findOne({ username: req.user.username })
            
            if (!user) {
                return res.status(404).json({ 
                    success: false,
                    message: 'User not found' 
                })
            }
        
            user.name = req.body.name || user.name
            user.bio = req.body.bio
            user.layout = req.body.layout || user.layout
            user.profilePicture = req.body.profilePicture || user.profilePicture
        
            await user.save()
            return res.status(200).json({ 
                success: true,
                message: 'Your profile was successfully updated',
                username: user.username,
            })
        } catch (err) {
            return res.status(500).json({ 
                success: false,
                message: 'An error occurred', error: err 
            })
        }
    }
)

router.get( '/user/:username', 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
        const belongsToLoggedIn = req.user.username === req.params.username
        const username = belongsToLoggedIn ? req.user.username : req.params.username
        
        try {
            const user = await User.findOne({ username: username }).select('-password -__v').exec()
            if (!user){
                return res.status(404).json({ 
                    success: false,
                    error: 'User not found' 
                })
            } 

            if (!belongsToLoggedIn){
                const blocked = (await Blocked.find({
                    $or: [
                    { blocker: req.user._id, blocked: user.id },
                    { blocker: user.id, blocked: req.user._id }
                    ]
                }).exec()).length > 0

                if (blocked) {
                    return res.status(404).json({ 
                        success: false,
                        error: 'User is blocked or has blocked you' 
                    })
                }
            }

            const posts = await Post.find({author: user.id}).exec()
            return res.status(200).json({ 
                success: true,
                belongsToLoggedIn, user, posts
            })
        
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching user data.',
                error: err,
            })
        }
    }
)

module.exports = router;
