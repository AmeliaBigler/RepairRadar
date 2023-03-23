const dashboard = require("express").Router();
const { Ticket, User, Bids, Mechanic } = require("../../models/index.js");
const isAuth = require("../../util/isAuth");
const { winnerBid } = require("../../util/mailer");

dashboard.get("/", isAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            include: [{ model: Ticket }, { model: Bids }],
            where: {
                username: req.session.username
            }
        })

        if (!userData) {
            const mechanicData = await Mechanic.findOne({
                include: [{ model: Bids }],
                where: {
                    username: req.session.username
                }
            })
            const mechanic = mechanicData.get({ plain: true });
            const bids = mechanic.bids
            var tickets = bids.map(async bid => {
                const ticketData = await Ticket.findByPk(bid.tickedId, {
                    include: {
                        model: Bids,
                        where: {
                            mechanicId: mechanic.id
                        }
                    }
                })
                return ticketData.get({ plain: true })
            });
            res.render("dashboard", { mechanic: mechanic, tickets: tickets });
        } else {
            const user = userData.get({ plain: true });
            res.render("dashboard", { user });
        }
    } catch (error) {
        res.status(500).json(error)
    }
});
/* 

    req.body {
        mechanicId: mechanic who won bid
        id: ticket id
    }

*/

dashboard.put("/", async (req, res) => {
    try {
        await Ticket.update({
            winner: req.body.mechanicId
        }, {
            where: {
                id: req.body.id
            }
        })
        const ticketData = await Ticket.findByPk(req.body.id);
        const ticket = ticketData.get({ plain: true });

        winnerBid(req, res, Mechanic, ticket);
    } catch (error) {
        res.status(500).json(error)
    }
});

dashboard.delete("/bid/:id", async (req, res) => {
    await Bids.destroy({
        where: {
            id: req.params.id
        }
    })
    const ticketData = await Ticket.findByPk(req.body.id, {
        include: { model: Bids }
    });
    const ticket = ticketData.get({ plain: true });
    res.render("dashboard", { ticket });
});

module.exports = dashboard