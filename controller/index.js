const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const ticketRoutes = require("./ticket.js");
const dashboardRoutes = require("./api/dashboard");
const bidsRoutes = require("./api/bids");
const homeRoutes = require("./homeRoutes")

router.use("/tickets", ticketRoutes)
router.use("/bids", bidsRoutes)
router.use('/users', userRoutes);
router.use("/dashboard", dashboardRoutes)
router.use(homeRoutes)

module.exports = router;