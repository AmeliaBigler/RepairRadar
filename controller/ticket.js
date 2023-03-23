const ticket = require("express").Router();
const { Ticket, Parts, TicketParts, User } = require("../models/index.js");
const isAuth = require("../util/isAuth");

ticket.get("/:id", async (req, res) => {
    const ticketData = await Ticket.findByPk(req.params.id);
    const ticket = ticketData.get({ plain: true });
    res.render("ticket", { ticket });
})

ticket.post("/", isAuth, async (req, res) => {
    const userData = await User.findOne({
        where: {
            username: req.session.username
        }
    });
    const user = userData.get({ plain: true });
    const newTicket = await Ticket.create({
        carMake: req.body.carMake,
        carModel: req.body.carModel,
        issue: req.body.issue,
        userId: user.id
    }, {
        returning: ["id"]
    });
    if (req.body.parts.length){
        var parts = req.body.parts
        var partsWithIds = parts.map(async part => {
            const partData = Parts.findOne({
                where: {
                    name: part
                }
            })
            var part = partData.get({ plain: true });
            return {
                ticketId: newTicket.id,
                partsId: part.id
            }
        })
        await TicketParts.bulkCreate(partsWithIds)
    }
})

ticket.delete("/:id", async (req, res) => {
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
        res.status(500).json(error)
    }
});

module.exports = ticket