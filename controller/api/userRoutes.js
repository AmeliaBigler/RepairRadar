const router = require('express').Router();
const { User, Mechanic } = require("../../models/index");
const { signup } = require("../../util/mailer.js");

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  } else {
    res.render('signup');
  }
});

router.post("/signup", async (req, res) => {
  // if user is a mechanic:
  try {
    if (req.body.userType === 'Mechanic') {
      const mechanicData = await Mechanic.findOne({
        where: {
          username: req.body.username
        }
      });

      if (mechanicData) {
        return res.status(404).render("signup", { message: "Username is already taken" });
      }
      const newMechanic = await Mechanic.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }, {
        returning: ['id']
      });
      const mechanic = newMechanic.get({ plain: true})
      console.log(mechanic)
      req.session.save(() => {
         req.session.username = mechanic.id;
         req.session.isMechanic = true;
         req.session.logged_in = true;
      });
       signup(req, res);
    } else {
      // if user is a client:
      const userData = await User.findOne({
      where: {
        username: req.body.username
      }
      })
      if (userData) {
        return res.status(404).render("signup", { message: "Username is already taken" });
      }
      const newUser = await User.create(req.body, {
        returning: ['id']
      });
      console.log(newUser)
      req.session.save(() => {
         req.session.username = req.body.username;
         req.session.isMechanic = false;
         req.session.logged_in = true;
      });
       signup(req, res);
    }
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
  
})

router.post('/login', async (req, res) => {
  try {
    // search for user or mechanic
    const userData = await User.findOne({ where: { email: req.body.email } });
    const mechanicData = await Mechanic.findOne({ where: { email: req.body.email }});

    // if neither, message try again
    if (!userData && !mechanicData) {
      res.status(400)
      .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // if user, validate user password. Session.isMechanic set to false.
    if (userData) {
      const validPassword = await userData.checkPassword(req.body.password);

      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }

      req.session.save(() => {
        req.session.user_id = userData.id;
        // req.session.username = userData.username;
        req.session.isMechanic = false;
        req.session.logged_in = true;

        res.json({ user: userData, message: 'You are now logged in!' });
      });
    }

    // if mechanic, validate mechanic password. session.isMechanic set to true.

    if (mechanicData) {
      const validPassword = await mechanicData.checkPassword(req.body.password);

      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }

      req.session.save(() => {
        req.session.user_id = mechanicData.id;
        // req.session.username = userData.username;
        req.session.isMechanic = true;
        req.session.logged_in = true;

        res.json({ user: mechanicData, message: 'You are now logged in!' });
      });
    }

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  } else {
    res.render('login');
  }
});

module.exports = router;