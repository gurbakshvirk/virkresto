// const { signup, login } = require('../Controllers/Authcontroller');
// const { signupvalidation, loginvalidation } = require('../Middleware/Authvalidation');

const ensureAuthenticated = require('../Middleware/Auth');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) => {
    console.log('Logged in user details ', req.user)
    res.status(200).json([
        {
            name: 'mobile',
            price: 10000
        },
        {
            name: 'tv',
            price: 15000
        }

    ])
});

// router.post('/signup', signupvalidation, signup);



module.exports = router;