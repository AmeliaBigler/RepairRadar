const ticket = require("express").Router();
const { Ticket, Bids, Mechanic, Room, User } = require("../models/index.js");
const isAuth = require("../util/isAuth");
const { winnerBid } = require("../util/mailer.js");
const opencage = require('opencage-api-client');

ticket.get("/:id", async (req, res) => {
    const ticketData = await Ticket.findByPk(req.params.id, {
        include: [{ model: Mechanic }]
    });
    const ticket = await ticketData.get({ plain: true });

    return res.render("ticket", {
        ticket: ticket
    });
})

ticket.get("/", isAuth, async (req, res) => {
    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    res.render("newTicket", {
        logged_in: req.session.logged_in,
        user: user.username
    });
})

ticket.post("/", isAuth, async (req, res) => {
    try {
        opencage.geocode({ q: req.body.location }).then(async (data) => {
            if (data.results.length = 0) {
                return res.status(404).json("Address not found")
            }
            if (data.status.code === 200 && data.results.length > 0) {
                await Ticket.create({
                    title: req.body.title,
                    carMake: req.body.carMake,
                    carModel: req.body.carModel,
                    modelYear: req.body.modelYear,
                    issue: req.body.issue,
                    userId: req.session.user_id,
                    lat: data.results[0].geometry.lat,
                    lon: data.results[0].geometry.lng
                });
                res.status(201).render('./dashboard')
            } else {
                res.end()
            }
        })
    }
    catch (error) {
        res.status(500).json(error);
    }
});

ticket.put('/:id', isAuth, async (req, res) => {
    // update a ticket with a winning bid
    /* req.body example:
      {
        "winner":1
      }
    */
    try {
        const ticketData = await Ticket.update(req.body, {
            where: {
                id: req.params.id,
            }
        });
        if (!ticketData) {
            res.status(404).json({ message: 'No ticket with this id!' });
            return;
        }
        await Room.create({
            userId: req.session.user_id,
            mechanicId: req.body.winner
        })
        const newTicketData = await Ticket.findByPk(req.params.id)
        const newTicket = newTicketData.get({ plain: true })
        winnerBid(req, res, Mechanic, newTicket);
    } catch (err) {
        res.status(500).json(err);
    }
});

ticket.delete("/:id", isAuth, async (req, res) => {
    try {
        await Ticket.destroy({
            where: {
                id: req.params.id
            }
        })
        const ticketData = await Ticket.findByPk(req.body.id, {
            include: { model: Bids }
        });
        const ticket = ticketData.get({ plain: true });
        res.render("dashboard", { ticket });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = ticket;
