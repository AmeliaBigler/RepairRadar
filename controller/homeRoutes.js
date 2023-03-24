const home = require("express").Router();
const { Ticket } = require("../models/index.js");

home.get("/", async (req, res) => {
    try {
        const ticketData = await Ticket.findAll();
        const tickets = ticketData.map(ticket => ticket.get({ plain: true}));
        res.render("home", { tickets : tickets, user: req.session.username });
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = home;