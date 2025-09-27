const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => { 
    //#swagger.tags=['Hello World']
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out");
});

router.get('/login', passport.authenticate('github'));

router.get('/logout', function(req, res, next){
    req.logout(function(err){
        if (err) {return next(err);}
        req.session.destroy();
        res.redirect('/');
    });
});

router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs'
}), (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

router.use('/users', require('./users'));
router.use('/products', require('./products'));


module.exports=router;

