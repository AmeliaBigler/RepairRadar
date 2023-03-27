function isAuth (req, res, next){
    if (req.session.logged_in){
        next();
    } else {
        res.redirect("/users/login");
    }
}

module.exports = isAuth;