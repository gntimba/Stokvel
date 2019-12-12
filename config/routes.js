var home = require('../app/controllers/user');

//you can include all your controllers

module.exports = function (app, passport) {

   
    app.post('/signup', home.signup);


    app.post('/auth', home.login);

    app.get('/profile',passport.authenticate('jwt', { session: false}),home.users);
    app.get('/logout',passport.authenticate('jwt', { session: false}),home.logout);
    app.post('/update',passport.authenticate('jwt', { session: false}),home.update);
    app.get('/in',passport.authenticate('jwt', { session: false}),home.testTate);
    app.get('/statement',passport.authenticate('jwt', { session: false}),home.getStatement);
   // app.get('/home', home.loggedIn, home.home);//home

    // app.post('/signup', passport.authenticate('local-signup', {
    //     successRedirect: '/home', // redirect to the secure profile section
    //     failureRedirect: '/signup', // redirect back to the signup page if there is an error
    //     failureFlash: true // allow flash messages
    // }));
    // process the login form
    // app.post('/login', passport.authenticate('local-login', {
    //     successRedirect: '/home', // redirect to the secure profile section
    //     failureRedirect: '/login', // redirect back to the signup page if there is an error
    //     failureFlash: true // allow flash messages
    // }));


}
