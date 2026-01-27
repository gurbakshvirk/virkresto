// const { signup, login } = require('../Controllers/Authcontroller');
// const { signupvalidation, loginvalidation } = require('../Middleware/Authvalidation');

const router = require('express').Router();

router.get('/',(req, res)=>{
    res.status(200).json([
       {
        name:'mobile',
        price:10000
       },
       {
        name:'tv',
        price:15000
       }

    ])
});

// router.post('/signup', signupvalidation, signup);



module.exports = router;