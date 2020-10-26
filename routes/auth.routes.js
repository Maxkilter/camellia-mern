const {Router} = require('express');
const router = Router();
// encrypt passwords;
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

// /api/auth/
router.post('/register',
        [
            check('email', 'Email is not correct').isEmail(),
            check('password', 'Password must be more than six symbols').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

        if(!errors.isEmpty()) {
           return res.status(400).json({
                errors: errors.array(),
                message: "Incorrect registration data"
            })
        }

        const {email, password} = req.body;

        const candidate = await User.findOne({email});

        if (candidate) {
           return res.status(400).json({message: "User already exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({message: "User created!"})

    } catch (e) {
        res.status(500).json({message: "Something went wrong try again or try later :-("})
    }
})

router.post('/login',
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect entrance data"
                })
            }
            const {email, password} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                return res.status(400).json({message: "Your Email or Password is not correct!"})
            }

            const isPasswordMatched = await bcrypt.compare(password, user.password)

            if (!isPasswordMatched) {
                return res.status(400).json({message: "Your Email or Password is not correct!"})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.jwtSecretKey,
                {expiresIn: '1h'}
            );

          return res.json({token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: "Something went wrong try again or try later :-("})
        }
})

module.exports = router;

