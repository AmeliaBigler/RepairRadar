const router = require('express').Router();
const { User, Mechanic } = require('../../models');

router.post("/", async (req, res) => {
  if (req.body.mechanic) {
    const mechanicData = await Mechanic.findOne({
      where: {
        username: req.body.username
      }
    })
    if (mechanicData) {
      return res.status(404).render("signup", { message: "Username is already taken" })
    }
    await Mechanic.create(req.body)
    req.session.save(() => {
      req.session.username = req.body.username;
      req.session.isMechanic = true;
    });
    return res.status(201).json("Created")
  }
  const userData = await User.findOne({
    where: {
      username: req.body.username
    }
  })
  if (userData) {
    return res.status(404).render("signup", { message: "Username is already taken" })
  }
  await User.create(req.body)
  req.session.save(() => {
    req.session.username = req.body.username;
    req.session.isMechanic = true;
  });
  return res.status(201).json("Created")
})

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

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

module.exports = router;