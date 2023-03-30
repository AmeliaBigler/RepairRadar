const home = require("express").Router()
const { Ticket, User, Mechanic } = require("../models/index.js")

home.get("/", async (req, res) => {
    try {
        if (req.session.isMechanic) {
            const ticketData = await Ticket.findAll({
                include: {
                    model: User,
                }
            })
            const tickets = ticketData.map(ticket => ticket.get({ plain: true }));
            const mechanicData = await Mechanic.findByPk(req.session.user_id);
            const mechanic = mechanicData.get({ plain: true });
            return res.render("home", {
                logged_in: req.session.logged_in,
                isMechanic: req.session.isMechanic,
                tickets: tickets,
                username: mechanic.username
            }
            )
        }
        const ticketData = await Ticket.findAll({
            include: {
                model: User,
            }
        })
        const tickets = ticketData.map(ticket => ticket.get({ plain: true }));
        res.render("home", {
            logged_in: req.session.logged_in,
            isMechanic: req.session.isMechanic,
            tickets: tickets
        }
        )


    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = home;

