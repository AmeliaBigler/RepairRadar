function isAuth (req, res, next){
    if (req.session.user_id){
        next();
    } else {
        res.redirect("/users/login");
    }
}

module.exports = isAuth;