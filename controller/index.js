const router = require("express").Router();
const userRoutes = require("./api/userRoutes");
const ticketRoutes = require("./ticket.js");
const dashboardRoutes = require("./dashboard");
const bidsRoutes = require("./api/bids");
const homeRoutes = require("./homeRoutes");
const messageRoutes = require("./messages")
const apiTicketRoutes = require("./api/ticket")

router.use("/tickets", ticketRoutes);
router.use("/bids", bidsRoutes);
router.use("/users", userRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/", homeRoutes);
router.use("/messages", messageRoutes)
router.use("/api/tickets", apiTicketRoutes)

module.exports = router;